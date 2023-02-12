// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";

import {
	isAnyKeyword,
	isBigIntKeyword,
	isBooleanKeyword,
	isConstAssertionExpression,
	isEntityNameExpression,
	isNeverKeyword,
	isNumberKeyword,
	isNumericOrStringLikeLiteral,
	isObjectKeyword,
	isStringKeyword,
	isSymbolKeyword,
	isUndefinedKeyword,
	isUnknownKeyword,
	isVoidKeyword,
} from "./typeGuards/index.js";

/** Determines whether a call to `Object.defineProperty` is statically analyzable. */
export function isBindableObjectDefinePropertyCall(
	node: ts.CallExpression
): boolean {
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

/** Detects whether an expression is affected by an enclosing 'as const' assertion and therefore treated literally. */
export function isInConstContext(node: ts.Expression): boolean {
	let current: ts.Node = node;
	while (true) {
		const parent = current.parent;
		outer: switch (parent.kind) {
			case ts.SyntaxKind.TypeAssertionExpression:
			case ts.SyntaxKind.AsExpression:
				return isConstAssertionExpression(parent as ts.AssertionExpression);
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

export function isPartOfTypeNode(node: ts.Node): boolean {
	if (
		(node.kind >= ts.SyntaxKind.FirstTypeNode &&
			node.kind <= ts.SyntaxKind.LastTypeNode) ||
		isAnyKeyword(node) ||
		isUnknownKeyword(node) ||
		isNumberKeyword(node) ||
		isBigIntKeyword(node) ||
		isObjectKeyword(node) ||
		isBooleanKeyword(node) ||
		isStringKeyword(node) ||
		isSymbolKeyword(node) ||
		isUndefinedKeyword(node) ||
		isNeverKeyword(node) ||
		ts.isExpressionWithTypeArguments(node)
	) {
		return true;
	}

	if (isVoidKeyword(node)) {
		return ts.isVoidExpression(node.parent);
	}

	if (ts.isExpressionWithTypeArguments(node)) {
		return (
			ts.isHeritageClause(node.parent) &&
			!isExpressionWithTypeArgumentsInClassExtendsClause(node)
		);
	}

	if (ts.isTypeParameterDeclaration(node)) {
		return ts.isMappedTypeNode(node.parent) || ts.isInferTypeNode(node.parent);
	}

	if (ts.isIdentifier(node)) {
		if (ts.isQualifiedName(node.parent) && node.parent.right === node) {
			return isPartOfTypeNodeInternal(node.parent);
		} else if (
			ts.isPropertyAccessExpression(node.parent) &&
			node.parent.name === node
		) {
			return isPartOfTypeNodeInternal(node.parent);
		}

		return isPartOfTypeNodeInternal(node);
	}

	return false;
}

function isPartOfTypeNodeInternal(
	node:
		| ts.TypeNode
		| ts.Identifier
		| ts.QualifiedName
		| ts.PropertyAccessExpression
): boolean {
	if (ts.isTypeQueryNode(node.parent)) {
		return false;
	}

	if (ts.isImportTypeNode(node.parent)) {
		return !node.parent.isTypeOf;
	}

	if (
		ts.SyntaxKind.FirstTypeNode <= node.parent.kind &&
		node.parent.kind <= ts.SyntaxKind.LastTypeNode
	) {
		return true;
	}

	if (ts.isExpressionWithTypeArguments(node.parent))
		return (
			ts.isHeritageClause(node.parent.parent) &&
			!isExpressionWithTypeArgumentsInClassExtendsClause(node.parent)
		);

	if (ts.isTypeParameterDeclaration(node.parent)) {
		return node === node.parent.constraint;
	}

	if (ts.isJSDocTemplateTag(node.parent)) {
		return node === node.parent.constraint;
	}

	if (
		ts.isPropertyDeclaration(node.parent) ||
		ts.isPropertySignature(node.parent) ||
		ts.isParameter(node.parent) ||
		ts.isVariableDeclaration(node.parent)
	) {
		return node === node.parent.type;
	}

	if (
		ts.isFunctionDeclaration(node.parent) ||
		ts.isFunctionExpression(node.parent) ||
		ts.isArrowFunction(node.parent) ||
		ts.isConstructorDeclaration(node.parent) ||
		ts.isMethodDeclaration(node.parent) ||
		ts.isMethodSignature(node.parent) ||
		ts.isGetAccessor(node.parent) ||
		ts.isSetAccessor(node.parent)
	) {
		return node === node.parent.type;
	}

	if (
		ts.isCallSignatureDeclaration(node.parent) ||
		ts.isConstructSignatureDeclaration(node.parent) ||
		ts.isIndexSignatureDeclaration(node.parent)
	) {
		return node === node.parent.type;
	}

	if (ts.isTypeAssertionExpression(node.parent)) {
		return node === node.parent.type;
	}

	if (ts.isCallExpression(node.parent) || ts.isNewExpression(node.parent)) {
		return node.parent.typeArguments?.includes(node as ts.TypeNode) === true;
	}

	return false;
}

function isExpressionWithTypeArgumentsInClassExtendsClause(
	node: ts.ExpressionWithTypeArguments
): boolean {
	if (
		!ts.isExpressionWithTypeArguments(node) ||
		!ts.isHeritageClause(node.parent) ||
		!ts.isClassLike(node.parent.parent)
	) {
		return false;
	}

	return node.parent.token !== ts.SyntaxKind.ImplementsKeyword;
}
