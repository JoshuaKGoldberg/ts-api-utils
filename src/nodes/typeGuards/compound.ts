// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";

import { isNodeFlagSet } from "../../flags";
import {
	isArrayLiteralExpression,
	isBinaryExpression,
	isCallExpression,
	isElementAccessExpression,
	isEqualsToken,
	isIdentifier,
	isModuleDeclaration,
	isNonNullExpression,
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

export function isCallChain(node: ts.Node): node is ts.CallChain {
	return (
		isCallExpression(node) && isNodeFlagSet(node, ts.NodeFlags.OptionalChain)
	);
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

export function isElementAccessChain(
	node: ts.Node
): node is ts.ElementAccessChain {
	return (
		isElementAccessExpression(node) &&
		isNodeFlagSet(node, ts.NodeFlags.OptionalChain)
	);
}

export function isExpression(node: ts.Node): node is ts.Expression {
	return ts.isExpression(node);
}

export type ExpressionNode =
	| ts.ArrayLiteralExpression
	| ts.ArrowFunction
	| ts.AsExpression
	| ts.AwaitExpression
	| ts.BigIntLiteral
	| ts.BinaryExpression
	| ts.CallExpression
	| ts.ClassExpression
	| ts.ConditionalExpression
	| ts.DeleteExpression
	| ts.ElementAccessExpression
	| ts.ExpressionWithTypeArguments
	| ts.FalseLiteral
	| ts.FunctionExpression
	| ts.Identifier
	| ts.JSDocMemberName
	| ts.JsxElement
	| ts.JsxFragment
	| ts.JsxSelfClosingElement
	| ts.MetaProperty
	| ts.NewExpression
	| ts.NonNullExpression
	| ts.NoSubstitutionTemplateLiteral
	| ts.NullLiteral
	| ts.NumericLiteral
	| ts.ObjectLiteralExpression
	| ts.OmittedExpression
	| ts.ParenthesizedExpression
	| ts.PostfixUnaryExpression
	| ts.PrefixUnaryExpression
	| ts.PrivateIdentifier
	| ts.PropertyAccessExpression
	| ts.QualifiedName
	| ts.RegularExpressionLiteral
	| ts.SatisfiesExpression
	| ts.SpreadElement
	| ts.StringLiteral
	| ts.SuperExpression
	| ts.TaggedTemplateExpression
	| ts.TemplateExpression
	| ts.ThisExpression
	| ts.TrueLiteral
	| ts.TypeAssertion
	| ts.TypeOfExpression
	| ts.VoidExpression
	| ts.YieldExpression;

export function isExpressionNode(node: ts.Node): node is ExpressionNode {
	return ts.isExpressionNode(node);
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

export function isLeftHandSideExpression(
	node: ts.Node
): node is ts.LeftHandSideExpression {
	return ts.isLeftHandSideExpression(node);
}

export function isLiteralExpression(
	node: ts.Node
): node is ts.LiteralExpression {
	return (
		node.kind >= ts.SyntaxKind.FirstLiteralToken &&
		node.kind <= ts.SyntaxKind.LastLiteralToken
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

export function isNonNullChain(node: ts.Node): node is ts.NonNullChain {
	return (
		isNonNullExpression(node) && isNodeFlagSet(node, ts.NodeFlags.OptionalChain)
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

export function isPropertyAccessChain(
	node: ts.Node
): node is ts.PropertyAccessChain {
	return (
		isPropertyAccessExpression(node) &&
		isNodeFlagSet(node, ts.NodeFlags.OptionalChain)
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
