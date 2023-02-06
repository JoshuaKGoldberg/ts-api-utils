// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";

export function isConditionalType(type: ts.Type): type is ts.ConditionalType {
	return (type.flags & ts.TypeFlags.Conditional) !== 0;
}

export function isConstAssertion(node: ts.AssertionExpression) {
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

export function isIntersectionType(type: ts.Type): type is ts.IntersectionType {
	return (type.flags & ts.TypeFlags.Intersection) !== 0;
}

export function isParameterDeclaration(
	node: ts.Node
): node is ts.ParameterDeclaration {
	return node.kind === ts.SyntaxKind.Parameter;
}

export function isNumericPropertyName(name: string | ts.__String): boolean {
	return String(+name) === name;
}

export function isNumericOrStringLikeLiteral(
	node: ts.Node
): node is
	| ts.NumericLiteral
	| ts.StringLiteral
	| ts.NoSubstitutionTemplateLiteral {
	switch (node.kind) {
		case ts.SyntaxKind.StringLiteral:
		case ts.SyntaxKind.NumericLiteral:
		case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
			return true;
		default:
			return false;
	}
}

export function isObjectType(type: ts.Type): type is ts.ObjectType {
	return (type.flags & ts.TypeFlags.Object) !== 0;
}

export function isUnionOrIntersectionType(
	type: ts.Type
): type is ts.UnionOrIntersectionType {
	return (type.flags & ts.TypeFlags.UnionOrIntersection) !== 0;
}

export function isUnionType(type: ts.Type): type is ts.UnionType {
	return (type.flags & ts.TypeFlags.Union) !== 0;
}
