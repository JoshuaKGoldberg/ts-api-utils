// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";

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

export function isParameterDeclaration(
	node: ts.Node
): node is ts.ParameterDeclaration {
	return node.kind === ts.SyntaxKind.Parameter;
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
