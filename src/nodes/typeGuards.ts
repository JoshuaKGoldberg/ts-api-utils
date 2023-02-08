// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";

export function isAccessorDeclaration(
	node: ts.Node
): node is ts.AccessorDeclaration {
	return (
		node.kind === ts.SyntaxKind.GetAccessor ||
		node.kind === ts.SyntaxKind.SetAccessor
	);
}

export function isArrayBindingPattern(
	node: ts.Node
): node is ts.ArrayBindingPattern {
	return node.kind === ts.SyntaxKind.ArrayBindingPattern;
}

export function isArrayLiteralExpression(
	node: ts.Node
): node is ts.ArrayLiteralExpression {
	return node.kind === ts.SyntaxKind.ArrayLiteralExpression;
}

export function isArrayTypeNode(node: ts.Node): node is ts.ArrayTypeNode {
	return node.kind === ts.SyntaxKind.ArrayType;
}

export function isArrowFunction(node: ts.Node): node is ts.ArrowFunction {
	return node.kind === ts.SyntaxKind.ArrowFunction;
}

export function isAsExpression(node: ts.Node): node is ts.AsExpression {
	return node.kind === ts.SyntaxKind.AsExpression;
}

export function isAssertionExpression(
	node: ts.Node
): node is ts.AssertionExpression {
	return (
		node.kind === ts.SyntaxKind.AsExpression ||
		node.kind === ts.SyntaxKind.TypeAssertionExpression
	);
}

export function isAwaitExpression(node: ts.Node): node is ts.AwaitExpression {
	return node.kind === ts.SyntaxKind.AwaitExpression;
}

export function isBinaryExpression(node: ts.Node): node is ts.BinaryExpression {
	return node.kind === ts.SyntaxKind.BinaryExpression;
}

export function isBindingElement(node: ts.Node): node is ts.BindingElement {
	return node.kind === ts.SyntaxKind.BindingElement;
}

export function isBindingPattern(node: ts.Node): node is ts.BindingPattern {
	return (
		node.kind === ts.SyntaxKind.ArrayBindingPattern ||
		node.kind === ts.SyntaxKind.ObjectBindingPattern
	);
}

export function isBlock(node: ts.Node): node is ts.Block {
	return node.kind === ts.SyntaxKind.Block;
}

export function isBlockLike(node: ts.Node): node is ts.BlockLike {
	switch (node.kind) {
		case ts.SyntaxKind.SourceFile:
		case ts.SyntaxKind.Block:
		case ts.SyntaxKind.ModuleBlock:
		case ts.SyntaxKind.CaseClause:
		case ts.SyntaxKind.DefaultClause:
			return true;

		default:
			return false;
	}
}

export function isBooleanLiteral(node: ts.Node): node is ts.BooleanLiteral {
	return (
		node.kind === ts.SyntaxKind.TrueKeyword ||
		node.kind === ts.SyntaxKind.FalseKeyword
	);
}

export function isBreakStatement(node: ts.Node): node is ts.BreakStatement {
	return node.kind === ts.SyntaxKind.BreakStatement;
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
		ts.isTypeReferenceNode(node.type) &&
		node.type.typeName.kind === ts.SyntaxKind.Identifier &&
		node.type.typeName.escapedText === "const"
	);
}

export function isEntityNameExpression(
	node: ts.Node
): node is ts.EntityNameExpression {
	return (
		node.kind === ts.SyntaxKind.Identifier ||
		(ts.isPropertyAccessExpression(node) &&
			isEntityNameExpression(node.expression))
	);
}

export function isExpression(node: ts.Node): node is ts.Expression {
	switch (node.kind) {
		case ts.SyntaxKind.ArrayLiteralExpression:
		case ts.SyntaxKind.ArrowFunction:
		case ts.SyntaxKind.AsExpression:
		case ts.SyntaxKind.AwaitExpression:
		case ts.SyntaxKind.BinaryExpression:
		case ts.SyntaxKind.CallExpression:
		case ts.SyntaxKind.ClassExpression:
		case ts.SyntaxKind.CommaListExpression:
		case ts.SyntaxKind.ConditionalExpression:
		case ts.SyntaxKind.DeleteExpression:
		case ts.SyntaxKind.ElementAccessExpression:
		case ts.SyntaxKind.FalseKeyword:
		case ts.SyntaxKind.FunctionExpression:
		case ts.SyntaxKind.Identifier:
		case ts.SyntaxKind.JsxElement:
		case ts.SyntaxKind.JsxFragment:
		case ts.SyntaxKind.JsxExpression:
		case ts.SyntaxKind.JsxOpeningElement:
		case ts.SyntaxKind.JsxOpeningFragment:
		case ts.SyntaxKind.JsxSelfClosingElement:
		case ts.SyntaxKind.MetaProperty:
		case ts.SyntaxKind.NewExpression:
		case ts.SyntaxKind.NonNullExpression:
		case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
		case ts.SyntaxKind.NullKeyword:
		case ts.SyntaxKind.NumericLiteral:
		case ts.SyntaxKind.ObjectLiteralExpression:
		case ts.SyntaxKind.OmittedExpression:
		case ts.SyntaxKind.ParenthesizedExpression:
		case ts.SyntaxKind.PostfixUnaryExpression:
		case ts.SyntaxKind.PrefixUnaryExpression:
		case ts.SyntaxKind.PropertyAccessExpression:
		case ts.SyntaxKind.RegularExpressionLiteral:
		case ts.SyntaxKind.SpreadElement:
		case ts.SyntaxKind.StringLiteral:
		case ts.SyntaxKind.SuperKeyword:
		case ts.SyntaxKind.TaggedTemplateExpression:
		case ts.SyntaxKind.TemplateExpression:
		case ts.SyntaxKind.ThisKeyword:
		case ts.SyntaxKind.TrueKeyword:
		case ts.SyntaxKind.TypeAssertionExpression:
		case ts.SyntaxKind.TypeOfExpression:
		case ts.SyntaxKind.VoidExpression:
		case ts.SyntaxKind.YieldExpression:
			return true;
		default:
			return false;
	}
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

export function isObjectBindingPattern(
	node: ts.Node
): node is ts.ObjectBindingPattern {
	return node.kind === ts.SyntaxKind.ObjectBindingPattern;
}

export function isParameterDeclaration(
	node: ts.Node
): node is ts.ParameterDeclaration {
	return node.kind === ts.SyntaxKind.Parameter;
}

export function isTupleTypeNode(node: ts.Node): node is ts.TupleTypeNode {
	return node.kind === ts.SyntaxKind.TupleType;
}

export function isTypeAssertion(node: ts.Node): node is ts.TypeAssertion {
	return node.kind === ts.SyntaxKind.TypeAssertionExpression;
}
