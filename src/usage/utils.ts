import ts from "typescript";

/**
 * Supports TypeScript&lt;4.8 versions that don't have canHaveDecorators.
 */
export function canHaveDecorators(node: ts.Node): node is ts.HasDecorators {
	return "canHaveDecorators" in ts
		? ts.canHaveDecorators(node)
		: "decorators" in node;
}

type NodeWithDecorators = {
	decorators: readonly ts.Decorator[] | undefined;
} & ts.HasDecorators;

/**
 * Supports TypeScript&lt;4.8 versions that don't have getDecorators.
 */
export function getDecorators(
	node: ts.HasDecorators,
): readonly ts.Decorator[] | undefined {
	return "getDecorators" in ts
		? ts.getDecorators(node)
		: (node as NodeWithDecorators).decorators;
}
