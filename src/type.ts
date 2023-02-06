// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";

import {
	isModifierFlagSet,
	isNodeFlagSet,
	isObjectFlagSet,
	isSymbolFlagSet,
	isTypeFlagSet,
} from "./flags";
import {
	isConstAssertion,
	isEntityNameExpression,
	isIntersectionType,
	isNumericOrStringLikeLiteral,
	isNumericPropertyName,
	isObjectType,
	isUnionType,
} from "./typeguards";

export function getPropertyOfType(type: ts.Type, name: ts.__String) {
	if (!(name as string).startsWith("__"))
		return type.getProperty(name as string);
	return type.getProperties().find((s) => s.escapedName === name);
}

/** Determines whether a call to `Object.defineProperty` is statically analyzable. */
export function isBindableObjectDefinePropertyCall(node: ts.CallExpression) {
	return (
		node.arguments.length === 3 &&
		isEntityNameExpression(node.arguments[0]) &&
		isNumericOrStringLikeLiteral(node.arguments[1]) &&
		ts.isPropertyAccessExpression(node.expression) &&
		node.expression.name.escapedText === "defineProperty" &&
		ts.isIdentifier(node.expression.expression) &&
		node.expression.expression.escapedText === "Object"
	);
}

/** Determines whether the given type is a boolean literal type and matches the given boolean literal (true or false). */
export function isBooleanLiteralType(type: ts.Type, literal: boolean) {
	return (
		isTypeFlagSet(type, ts.TypeFlags.BooleanLiteral) &&
		(type as unknown as { intrinsicName: string }).intrinsicName ===
			(literal ? "true" : "false")
	);
}

/** Detects whether an expression is affected by an enclosing 'as const' assertion and therefore treated literally. */
export function isInConstContext(node: ts.Expression) {
	let current: ts.Node = node;
	while (true) {
		const parent = current.parent;
		outer: switch (parent.kind) {
			case ts.SyntaxKind.TypeAssertionExpression:
			case ts.SyntaxKind.AsExpression:
				return isConstAssertion(parent as ts.AssertionExpression);
			case ts.SyntaxKind.PrefixUnaryExpression:
				if (current.kind !== ts.SyntaxKind.NumericLiteral) return false;
				switch ((parent as ts.PrefixUnaryExpression).operator) {
					case ts.SyntaxKind.PlusToken:
					case ts.SyntaxKind.MinusToken:
						current = parent;
						break outer;
					default:
						return false;
				}
			case ts.SyntaxKind.PropertyAssignment:
				if ((parent as ts.PropertyAssignment).initializer !== current)
					return false;
				current = parent.parent!;
				break;
			case ts.SyntaxKind.ShorthandPropertyAssignment:
				current = parent.parent!;
				break;
			case ts.SyntaxKind.ParenthesizedExpression:
			case ts.SyntaxKind.ArrayLiteralExpression:
			case ts.SyntaxKind.ObjectLiteralExpression:
			case ts.SyntaxKind.TemplateExpression:
				current = parent;
				break;
			default:
				return false;
		}
	}
}

/** Determines if writing to a certain property of a given type is allowed. */
export function isPropertyReadonlyInType(
	type: ts.Type,
	name: ts.__String,
	checker: ts.TypeChecker
): boolean {
	let seenProperty = false;
	let seenReadonlySignature = false;
	for (const t of unionTypeParts(type)) {
		if (getPropertyOfType(t, name) === undefined) {
			// property is not present in this part of the union -> check for readonly index signature
			const index =
				(isNumericPropertyName(name)
					? checker.getIndexInfoOfType(t, ts.IndexKind.Number)
					: undefined) ?? checker.getIndexInfoOfType(t, ts.IndexKind.String);
			if (index?.isReadonly) {
				if (seenProperty) return true;
				seenReadonlySignature = true;
			}
		} else if (
			seenReadonlySignature ||
			isReadonlyPropertyIntersection(t, name, checker)
		) {
			return true;
		} else {
			seenProperty = true;
		}
	}
	return false;
}

/** Returns true for `Object.defineProperty(o, 'prop', {value, writable: false})` and  `Object.defineProperty(o, 'prop', {get: () => 1})`*/
export function isReadonlyAssignmentDeclaration(
	node: ts.CallExpression,
	checker: ts.TypeChecker
) {
	if (!isBindableObjectDefinePropertyCall(node)) return false;
	const descriptorType = checker.getTypeAtLocation(node.arguments[2]);
	if (descriptorType.getProperty("value") === undefined)
		return descriptorType.getProperty("set") === undefined;
	const writableProp = descriptorType.getProperty("writable");
	if (writableProp === undefined) return false;
	const writableType =
		writableProp.valueDeclaration !== undefined &&
		ts.isPropertyAssignment(writableProp.valueDeclaration)
			? checker.getTypeAtLocation(writableProp.valueDeclaration.initializer)
			: checker.getTypeOfSymbolAtLocation(writableProp, node.arguments[2]);
	return isBooleanLiteralType(writableType, false);
}

function isReadonlyPropertyIntersection(
	type: ts.Type,
	name: ts.__String,
	checker: ts.TypeChecker
) {
	return someTypePart(type, isIntersectionType, (t): boolean => {
		const prop = getPropertyOfType(t, name);
		if (prop === undefined) return false;
		if (prop.flags & ts.SymbolFlags.Transient) {
			if (/^(?:[1-9]\d*|0)$/.test(name as string) && isTupleTypeReference(t))
				return t.target.readonly;
			switch (isReadonlyPropertyFromMappedType(t, name, checker)) {
				case true:
					return true;
				case false:
					return false;
				default:
				// `undefined` falls through
			}
		}
		return !!(
			// members of namespace import
			(
				isSymbolFlagSet(prop, ts.SymbolFlags.ValueModule) ||
				// we unwrapped every mapped type, now we can check the actual declarations
				symbolHasReadonlyDeclaration(prop, checker)
			)
		);
	});
}

function isReadonlyPropertyFromMappedType(
	type: ts.Type,
	name: ts.__String,
	checker: ts.TypeChecker
): boolean | undefined {
	if (!isObjectType(type) || !isObjectFlagSet(type, ts.ObjectFlags.Mapped))
		return;
	const declaration = type.symbol.declarations![0] as ts.MappedTypeNode;
	// well-known symbols are not affected by mapped types
	if (
		declaration.readonlyToken !== undefined &&
		!/^__@[^@]+$/.test(name as string)
	)
		return declaration.readonlyToken.kind !== ts.SyntaxKind.MinusToken;
	return isPropertyReadonlyInType(
		(type as unknown as { modifiersType: ts.Type }).modifiersType,
		name,
		checker
	);
}

export function isTupleType(type: ts.Type): type is ts.TupleType {
	return (
		(type.flags & ts.TypeFlags.Object &&
			(type as ts.ObjectType).objectFlags & ts.ObjectFlags.Tuple) !== 0
	);
}

export function isTupleTypeReference(
	type: ts.Type
): type is ts.TypeReference & { target: ts.TupleType } {
	return isTypeReference(type) && isTupleType(type.target);
}

export function isTypeReference(type: ts.Type): type is ts.TypeReference {
	return (
		(type.flags & ts.TypeFlags.Object) !== 0 &&
		((type as ts.ObjectType).objectFlags & ts.ObjectFlags.Reference) !== 0
	);
}

export function someTypePart(
	type: ts.Type,
	predicate: (t: ts.Type) => t is ts.UnionOrIntersectionType,
	cb: (t: ts.Type) => boolean
) {
	return predicate(type) ? type.types.some(cb) : cb(type);
}

export function symbolHasReadonlyDeclaration(
	symbol: ts.Symbol,
	checker: ts.TypeChecker
) {
	return (
		(symbol.flags & ts.SymbolFlags.Accessor) === ts.SymbolFlags.GetAccessor ||
		symbol.declarations?.some(
			(node) =>
				isModifierFlagSet(node, ts.ModifierFlags.Readonly) ||
				(ts.isVariableDeclaration(node) &&
					isNodeFlagSet(node.parent, ts.NodeFlags.Const)) ||
				(ts.isCallExpression(node) &&
					isReadonlyAssignmentDeclaration(node, checker)) ||
				ts.isEnumMember(node) ||
				((ts.isPropertyAssignment(node) ||
					ts.isShorthandPropertyAssignment(node)) &&
					isInConstContext(node.parent))
		)
	);
}

export function unionTypeParts(type: ts.Type): ts.Type[] {
	return isUnionType(type) ? type.types : [type];
}
