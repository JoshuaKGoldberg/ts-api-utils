import ts from "typescript";

/**
 * Supports TypeScript<5 versions that don't have identifierToKeywordKind.
 */
export function identifierToKeywordKind(
	node: ts.Identifier,
): ts.SyntaxKind | undefined {
	return "originalKeywordKind" in node
		? (node.originalKeywordKind as ts.SyntaxKind)
		: ts.identifierToKeywordKind(node);
}
