import * as ts from "typescript";

import {
	isConstructorTypeNode,
	isFunctionTypeNode,
	isIntersectionTypeNode,
	isUnionTypeNode,
} from "./single.js";

export function isTypeNode(node: ts.Node): node is ts.TypeNode {
	return (
		(node.kind >= ts.SyntaxKind.FirstTypeNode &&
			node.kind <= ts.SyntaxKind.LastTypeNode) ||
		node.kind === ts.SyntaxKind.AnyKeyword ||
		node.kind === ts.SyntaxKind.UnknownKeyword ||
		node.kind === ts.SyntaxKind.NumberKeyword ||
		node.kind === ts.SyntaxKind.BigIntKeyword ||
		node.kind === ts.SyntaxKind.ObjectKeyword ||
		node.kind === ts.SyntaxKind.BooleanKeyword ||
		node.kind === ts.SyntaxKind.StringKeyword ||
		node.kind === ts.SyntaxKind.SymbolKeyword ||
		node.kind === ts.SyntaxKind.VoidKeyword ||
		node.kind === ts.SyntaxKind.UndefinedKeyword ||
		node.kind === ts.SyntaxKind.NeverKeyword ||
		ts.isExpressionWithTypeArguments(node) ||
		ts.isJSDocAllType(node) ||
		ts.isJSDocUnknownType(node) ||
		ts.isJSDocNullableType(node) ||
		ts.isJSDocNonNullableType(node) ||
		ts.isJSDocOptionalType(node) ||
		ts.isJSDocFunctionType(node) ||
		ts.isJSDocVariadicType(node)
	);
}

export function isFunctionOrConstructorTypeNode(
	node: ts.TypeNode
): node is ts.FunctionOrConstructorTypeNode {
	return isFunctionTypeNode(node) || isConstructorTypeNode(node);
}

export function isUnionOrIntersectionTypeNode(
	node: ts.TypeNode
): node is ts.UnionOrIntersectionTypeNode {
	return isUnionTypeNode(node) || isIntersectionTypeNode(node);
}
