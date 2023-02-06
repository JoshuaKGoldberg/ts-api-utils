// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";

import {
	isModifierFlagSet,
	isNodeFlagSet,
	isObjectFlagSet,
	isSymbolFlagSet,
	isTypeFlagSet,
} from "../flags";
import {
	isBindableObjectDefinePropertyCall,
	isInConstContext,
} from "../nodes/utilities";
import { isNumericPropertyName } from "../syntax";
import { getPropertyOfType } from "./getters";
import {
	isIntersectionType,
	isLiteralType,
	isObjectType,
	isTupleTypeReference,
	isUnionType,
} from "./typeGuards";

/** Determines whether the given type is a boolean literal type and matches the given boolean literal. */
export function isBooleanLiteralType(type: ts.Type, literal: boolean): boolean {
	return (
		isTypeFlagSet(type, ts.TypeFlags.BooleanLiteral) &&
		(type as unknown as { intrinsicName: string }).intrinsicName ===
			(literal ? "true" : "false")
	);
}

/** Determines whether a type is definitely falsy. This function doesn't unwrap union types. */
export function isFalsyType(type: ts.Type): boolean {
	if (
		type.flags &
		(ts.TypeFlags.Undefined | ts.TypeFlags.Null | ts.TypeFlags.Void)
	)
		return true;
	if (isLiteralType(type)) return !type.value;
	return isBooleanLiteralType(type, false);
}

function isReadonlyPropertyIntersection(
	type: ts.Type,
	name: ts.__String,
	typeChecker: ts.TypeChecker
) {
	return someTypePart(type, isIntersectionType, (subType): boolean => {
		const prop = getPropertyOfType(subType, name);
		if (prop === undefined) return false;
		if (prop.flags & ts.SymbolFlags.Transient) {
			if (
				/^(?:[1-9]\d*|0)$/.test(name as string) &&
				isTupleTypeReference(subType)
			)
				return subType.target.readonly;
			switch (isReadonlyPropertyFromMappedType(subType, name, typeChecker)) {
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
				symbolHasReadonlyDeclaration(prop, typeChecker)
			)
		);
	});
}

function isReadonlyPropertyFromMappedType(
	type: ts.Type,
	name: ts.__String,
	typeChecker: ts.TypeChecker
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

	const { modifiersType } = type as { modifiersType?: ts.Type };

	return (
		modifiersType && isPropertyReadonlyInType(modifiersType, name, typeChecker)
	);
}

function isCallback(
	typeChecker: ts.TypeChecker,
	param: ts.Symbol,
	node: ts.Node
): boolean {
	let type: ts.Type | undefined = typeChecker.getApparentType(
		typeChecker.getTypeOfSymbolAtLocation(param, node)
	);
	if ((param.valueDeclaration as ts.ParameterDeclaration).dotDotDotToken) {
		// unwrap array type of rest parameter
		type = type.getNumberIndexType();
		if (type === undefined) return false;
	}
	for (const subType of unionTypeParts(type)) {
		if (subType.getCallSignatures().length !== 0) return true;
	}
	return false;
}

/** Determines whether writing to a certain property of a given type is allowed. */
export function isPropertyReadonlyInType(
	type: ts.Type,
	name: ts.__String,
	typeChecker: ts.TypeChecker
): boolean {
	let seenProperty = false;
	let seenReadonlySignature = false;
	for (const subType of unionTypeParts(type)) {
		if (getPropertyOfType(subType, name) === undefined) {
			// property is not present in this part of the union -> check for readonly index signature
			const index =
				(isNumericPropertyName(name)
					? typeChecker.getIndexInfoOfType(subType, ts.IndexKind.Number)
					: undefined) ??
				typeChecker.getIndexInfoOfType(subType, ts.IndexKind.String);
			if (index?.isReadonly) {
				if (seenProperty) return true;
				seenReadonlySignature = true;
			}
		} else if (
			seenReadonlySignature ||
			isReadonlyPropertyIntersection(subType, name, typeChecker)
		) {
			return true;
		} else {
			seenProperty = true;
		}
	}
	return false;
}

/** Returns true for `Object.defineProperty(o, 'prop', {value, writable: false})` and  `Object.defineProperty(o, 'prop', {get: () => 1})`*/
function isReadonlyAssignmentDeclaration(
	node: ts.CallExpression,
	typeChecker: ts.TypeChecker
) {
	if (!isBindableObjectDefinePropertyCall(node)) return false;
	const descriptorType = typeChecker.getTypeAtLocation(node.arguments[2]);
	if (descriptorType.getProperty("value") === undefined)
		return descriptorType.getProperty("set") === undefined;
	const writableProp = descriptorType.getProperty("writable");
	if (writableProp === undefined) return false;
	const writableType =
		writableProp.valueDeclaration !== undefined &&
		ts.isPropertyAssignment(writableProp.valueDeclaration)
			? typeChecker.getTypeAtLocation(writableProp.valueDeclaration.initializer)
			: typeChecker.getTypeOfSymbolAtLocation(writableProp, node.arguments[2]);
	return isBooleanLiteralType(writableType, false);
}

/** Determines whether a type is thenable and thus can be used with `await`. */
export function isThenableType(
	typeChecker: ts.TypeChecker,
	node: ts.Node,
	type: ts.Type
): boolean;
/** Determines whether a type is thenable and thus can be used with `await`. */
export function isThenableType(
	typeChecker: ts.TypeChecker,
	node: ts.Expression,
	type?: ts.Type
): boolean;
export function isThenableType(
	typeChecker: ts.TypeChecker,
	node: ts.Node,
	type = typeChecker.getTypeAtLocation(node)!
): boolean {
	for (const typePart of unionTypeParts(typeChecker.getApparentType(type))) {
		const then = typePart.getProperty("then");
		if (then === undefined) continue;
		const thenType = typeChecker.getTypeOfSymbolAtLocation(then, node);
		for (const subTypePart of unionTypeParts(thenType))
			for (const signature of subTypePart.getCallSignatures())
				if (
					signature.parameters.length !== 0 &&
					isCallback(typeChecker, signature.parameters[0], node)
				)
					return true;
	}
	return false;
}

export type SomeTypePartPredicate = (
	subType: ts.Type
) => subType is ts.UnionOrIntersectionType;

export type SomeTypePartCallback = (subType: ts.Type) => boolean;

export function someTypePart(
	type: ts.Type,
	predicate: SomeTypePartPredicate,
	callback: SomeTypePartCallback
): boolean {
	return predicate(type) ? type.types.some(callback) : callback(type);
}

export function symbolHasReadonlyDeclaration(
	symbol: ts.Symbol,
	typeChecker: ts.TypeChecker
): boolean {
	return !!(
		(symbol.flags & ts.SymbolFlags.Accessor) === ts.SymbolFlags.GetAccessor ||
		symbol.declarations?.some(
			(node) =>
				isModifierFlagSet(node, ts.ModifierFlags.Readonly) ||
				(ts.isVariableDeclaration(node) &&
					isNodeFlagSet(node.parent, ts.NodeFlags.Const)) ||
				(ts.isCallExpression(node) &&
					isReadonlyAssignmentDeclaration(node, typeChecker)) ||
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
