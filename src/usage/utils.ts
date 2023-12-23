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
 * Supports TypeScript<4.8 versions that don't have canHaveDecorators.
 */
export function canHaveDecorators(node: ts.Node): node is ts.HasDecorators {
	return "canHaveDecorators" in ts
		? ts.canHaveDecorators(node)
		: "decorators" in node;
}

type NodeWithDecorators = ts.HasDecorators & {
	decorators: readonly ts.Decorator[] | undefined;
};

/**
 * Supports TypeScript<4.8 versions that don't have getDecorators.
 */
export function getDecorators(
	node: ts.HasDecorators,
): readonly ts.Decorator[] | undefined {
	return "getDecorators" in ts
		? ts.getDecorators(node)
		: (node as NodeWithDecorators).decorators;
}
