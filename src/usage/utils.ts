import ts from "typescript";

/**
 * Supports TypeScript<5 versions that don't have identifierToKeywordKind.
 */
export function identifierToKeywordKind(
	node: ts.Identifier,
): ts.SyntaxKind | undefined {
	return "identifierToKeywordKind" in ts
		? ts.identifierToKeywordKind(node)
		: // eslint-disable-next-line deprecation/deprecation
		  node.originalKeywordKind;
}

/**
 * Supports TypeScript<4.8 versions that don't have identifierToKeywordKind.
 */
export function canHaveDecorators(node: ts.Node): node is ts.HasDecorators {
	return "canHaveDecorators" in ts
		? ts.canHaveDecorators(node)
		: "decorators" in node;
}
