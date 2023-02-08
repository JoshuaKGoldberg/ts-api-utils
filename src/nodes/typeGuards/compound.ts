import * as ts from "typescript";

import { isLeftHandSideExpression } from "./internal";
import {
	isArrayLiteralExpression,
	isBinaryExpression,
	isElementAccessExpression,
	isEqualsToken,
	isIdentifier,
	isModuleDeclaration,
	isObjectLiteralExpression,
	isPropertyAccessExpression,
	isSuperExpression,
	isTypeReferenceNode,
} from "./single";
import {
	isEntityNameExpression,
	isJSDocNamespaceBody,
	isJsxTagNameExpression,
	isNamespaceBody,
} from "./union";

export function isArrayDestructuringAssignment(
	node: ts.Node
): node is ts.ArrayDestructuringAssignment {
	return (
		isEqualsAssignmentExpression(node) && isArrayLiteralExpression(node.left)
	);
}

export function isAssignmentExpression(
	node: ts.Node
): node is ts.AssignmentExpression<ts.AssignmentOperatorToken> {
	return isBinaryExpression(node) && isLeftHandSideExpression(node.left);
}

export function isEqualsAssignmentExpression(
	node: ts.Node
): node is ts.AssignmentExpression<ts.EqualsToken> {
	return isAssignmentExpression(node) && isEqualsToken(node.operatorToken);
}

export type ConstAssertionExpression = ts.AssertionExpression & {
	type: ts.TypeReferenceNode;
	typeName: ConstAssertionIdentifier;
};

export type ConstAssertionIdentifier = ts.Identifier & {
	escapedText: ts.__String & "const";
};

export function isConstAssertionExpression(
	node: ts.AssertionExpression
): node is ConstAssertionExpression {
	return (
		isTypeReferenceNode(node.type) &&
		isIdentifier(node.type.typeName) &&
		node.type.typeName.escapedText === "const"
	);
}

export function isIterationStatement(
	node: ts.Node
): node is ts.IterationStatement {
	switch (node.kind) {
		case ts.SyntaxKind.ForStatement:
		case ts.SyntaxKind.ForOfStatement:
		case ts.SyntaxKind.ForInStatement:
		case ts.SyntaxKind.WhileStatement:
		case ts.SyntaxKind.DoStatement:
			return true;
		default:
			return false;
	}
}

export function isJSDocNamespaceDeclaration(
	node: ts.Node
): node is ts.JSDocNamespaceDeclaration {
	return (
		isModuleDeclaration(node) &&
		isIdentifier(node.name) &&
		(node.body === undefined || isJSDocNamespaceBody(node.body))
	);
}

export function isJsxTagNamePropertyAccess(
	node: ts.Node
): node is ts.JsxTagNamePropertyAccess {
	return (
		isPropertyAccessExpression(node) && isJsxTagNameExpression(node.expression)
	);
}

export function isNamespaceDeclaration(
	node: ts.Node
): node is ts.NamespaceDeclaration {
	return (
		isModuleDeclaration(node) &&
		isIdentifier(node.name) &&
		node.body !== undefined &&
		isNamespaceBody(node.body)
	);
}

export type NumericOrStringLikeLiteral =
	| ts.NumericLiteral
	| ts.StringLiteral
	| ts.NoSubstitutionTemplateLiteral;

export function isNumericOrStringLikeLiteral(
	node: ts.Node
): node is NumericOrStringLikeLiteral {
	switch (node.kind) {
		case ts.SyntaxKind.StringLiteral:
		case ts.SyntaxKind.NumericLiteral:
		case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
			return true;
		default:
			return false;
	}
}

export function isObjectDestructuringAssignment(
	node: ts.Node
): node is ts.ObjectDestructuringAssignment {
	return (
		isEqualsAssignmentExpression(node) && isObjectLiteralExpression(node.left)
	);
}

export function isPropertyAccessEntityNameExpression(
	node: ts.Node
): node is ts.PropertyAccessEntityNameExpression {
	return (
		isPropertyAccessExpression(node) &&
		isIdentifier(node.name) &&
		isEntityNameExpression(node.expression)
	);
}

export function isSuperElementAccessExpression(
	node: ts.Node
): node is ts.SuperElementAccessExpression {
	return isElementAccessExpression(node) && isSuperExpression(node.expression);
}

export function isSuperPropertyAccessExpression(
	node: ts.Node
): node is ts.SuperPropertyAccessExpression {
	return isPropertyAccessExpression(node) && isSuperExpression(node.expression);
}

export function isTextualLiteral(
	node: ts.Node
): node is ts.StringLiteral | ts.NoSubstitutionTemplateLiteral {
	return (
		node.kind === ts.SyntaxKind.StringLiteral ||
		node.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral
	);
}

export {
	isCallChain,
	isElementAccessChain,
	isLiteralExpression,
	isNonNullChain,
	isPropertyAccessChain,
} from "typescript";
