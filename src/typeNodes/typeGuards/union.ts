import * as ts from "typescript";

import {
	isConstructorTypeNode,
	isFunctionTypeNode,
	isIntersectionTypeNode,
	isUnionTypeNode,
} from "./single.js";

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
