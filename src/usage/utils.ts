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
