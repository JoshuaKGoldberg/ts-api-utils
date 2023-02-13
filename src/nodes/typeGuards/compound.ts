import * as ts from "typescript";

import { isSuperExpression } from "./single";
import {
	isEntityNameExpression,
	isJSDocNamespaceBody,
	isJsxTagNameExpression,
	isNamespaceBody,
} from "./union";

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
		ts.isTypeReferenceNode(node.type) &&
		ts.isIdentifier(node.type.typeName) &&
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
): node is tsDocNamespaceDeclaration {
	return (
		ts.isModuleDeclaration(node) &&
		ts.isIdentifier(node.name) &&
		(node.body === undefined || isJSDocNamespaceBody(node.body))
	);
}

export function isJsxTagNamePropertyAccess(
	node: ts.Node
): node is ts.JsxTagNamePropertyAccess {
	return (
		ts.isPropertyAccessExpression(node) &&
		isJsxTagNameExpression(node.expression)
	);
}

export function isNamespaceDeclaration(
	node: ts.Node
): node is ts.NamespaceDeclaration {
	return (
		ts.isModuleDeclaration(node) &&
		ts.isIdentifier(node.name) &&
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

export function isPropertyAccessEntityNameExpression(
	node: ts.Node
): node is ts.PropertyAccessEntityNameExpression {
	return (
		ts.isPropertyAccessExpression(node) &&
		ts.isIdentifier(node.name) &&
		isEntityNameExpression(node.expression)
	);
}

export function isSuperElementAccessExpression(
	node: ts.Node
): node is ts.SuperElementAccessExpression {
	return (
		ts.isElementAccessExpression(node) && isSuperExpression(node.expression)
	);
}

export function isSuperPropertyAccessExpression(
	node: ts.Node
): node is ts.SuperPropertyAccessExpression {
	return (
		ts.isPropertyAccessExpression(node) && isSuperExpression(node.expression)
	);
}
