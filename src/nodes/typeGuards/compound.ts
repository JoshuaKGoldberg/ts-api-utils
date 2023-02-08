// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";

import {
	isModuleDeclaration,
	isPropertyAccessExpression,
	isTypeReferenceNode,
} from "./simple";

export function isAccessorDeclaration(
	node: ts.Node
): node is ts.AccessorDeclaration {
	return (
		node.kind === ts.SyntaxKind.GetAccessor ||
		node.kind === ts.SyntaxKind.SetAccessor
	);
}

export function isAssertionExpression(
	node: ts.Node
): node is ts.AssertionExpression {
	return (
		node.kind === ts.SyntaxKind.AsExpression ||
		node.kind === ts.SyntaxKind.TypeAssertionExpression
	);
}

export function isBindingPattern(node: ts.Node): node is ts.BindingPattern {
	return (
		node.kind === ts.SyntaxKind.ArrayBindingPattern ||
		node.kind === ts.SyntaxKind.ObjectBindingPattern
	);
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

export function isBreakOrContinueStatement(
	node: ts.Node
): node is ts.BreakOrContinueStatement {
	return (
		node.kind === ts.SyntaxKind.BreakStatement ||
		node.kind === ts.SyntaxKind.ContinueStatement
	);
}

export function isCallLikeExpression(
	node: ts.Node
): node is ts.CallLikeExpression {
	switch (node.kind) {
		case ts.SyntaxKind.CallExpression:
		case ts.SyntaxKind.Decorator:
		case ts.SyntaxKind.JsxOpeningElement:
		case ts.SyntaxKind.JsxSelfClosingElement:
		case ts.SyntaxKind.NewExpression:
		case ts.SyntaxKind.TaggedTemplateExpression:
			return true;
		default:
			return false;
	}
}

export function isCaseOrDefaultClause(
	node: ts.Node
): node is ts.CaseOrDefaultClause {
	return (
		node.kind === ts.SyntaxKind.CaseClause ||
		node.kind === ts.SyntaxKind.DefaultClause
	);
}

export function isClassLikeDeclaration(
	node: ts.Node
): node is ts.ClassLikeDeclaration {
	return (
		node.kind === ts.SyntaxKind.ClassDeclaration ||
		node.kind === ts.SyntaxKind.ClassExpression
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
		node.type.typeName.kind === ts.SyntaxKind.Identifier &&
		node.type.typeName.escapedText === "const"
	);
}

export function isEntityNameExpression(
	node: ts.Node
): node is ts.EntityNameExpression {
	return (
		node.kind === ts.SyntaxKind.Identifier ||
		(isPropertyAccessExpression(node) &&
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

export function isForInOrOfStatement(
	node: ts.Node
): node is ts.ForInOrOfStatement {
	return (
		node.kind === ts.SyntaxKind.ForOfStatement ||
		node.kind === ts.SyntaxKind.ForInStatement
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

export function isJsxAttributeLike(node: ts.Node): node is ts.JsxAttributeLike {
	return (
		node.kind === ts.SyntaxKind.JsxAttribute ||
		node.kind === ts.SyntaxKind.JsxSpreadAttribute
	);
}

export function isJsxOpeningLikeElement(
	node: ts.Node
): node is ts.JsxOpeningLikeElement {
	return (
		node.kind === ts.SyntaxKind.JsxOpeningElement ||
		node.kind === ts.SyntaxKind.JsxSelfClosingElement
	);
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
		node.name.kind === ts.SyntaxKind.Identifier &&
		node.body !== undefined &&
		(node.body.kind === ts.SyntaxKind.ModuleBlock ||
			isNamespaceDeclaration(node.body))
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

export function isSignatureDeclaration(
	node: ts.Node
): node is ts.SignatureDeclaration {
	switch (node.kind) {
		case ts.SyntaxKind.CallSignature:
		case ts.SyntaxKind.ConstructSignature:
		case ts.SyntaxKind.MethodSignature:
		case ts.SyntaxKind.IndexSignature:
		case ts.SyntaxKind.FunctionType:
		case ts.SyntaxKind.ConstructorType:
		case ts.SyntaxKind.JSDocFunctionType:
		case ts.SyntaxKind.FunctionDeclaration:
		case ts.SyntaxKind.MethodDeclaration:
		case ts.SyntaxKind.Constructor:
		case ts.SyntaxKind.GetAccessor:
		case ts.SyntaxKind.SetAccessor:
		case ts.SyntaxKind.FunctionExpression:
		case ts.SyntaxKind.ArrowFunction:
			return true;
		default:
			return false;
	}
}

export function isTemplateLiteral(node: ts.Node): node is ts.TemplateLiteral {
	return (
		node.kind === ts.SyntaxKind.TemplateExpression ||
		node.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral
	);
}

export function isTextualLiteral(
	node: ts.Node
): node is ts.StringLiteral | ts.NoSubstitutionTemplateLiteral {
	return (
		node.kind === ts.SyntaxKind.StringLiteral ||
		node.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral
	);
}
