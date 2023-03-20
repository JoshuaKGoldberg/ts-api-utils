// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import ts from "typescript";

import { forEachToken } from "./tokens";

/**
 * Exclude trailing positions that would lead to scanning for trivia inside `JsxText`.
 *
 * @internal
 */
function canHaveTrailingTrivia(token: ts.Node): boolean {
	switch (token.kind) {
		case ts.SyntaxKind.CloseBraceToken:
			// after a JsxExpression inside a JsxElement's body can only be other JsxChild, but no trivia
			return (
				token.parent.kind !== ts.SyntaxKind.JsxExpression ||
				!isJsxElementOrFragment(token.parent.parent)
			);
		case ts.SyntaxKind.GreaterThanToken:
			switch (token.parent.kind) {
				case ts.SyntaxKind.JsxOpeningElement:
					// if end is not equal, this is part of the type arguments list. in all other cases it would be inside the element body
					return token.end !== token.parent.end;
				case ts.SyntaxKind.JsxOpeningFragment:
					return false; // would be inside the fragment
				case ts.SyntaxKind.JsxSelfClosingElement:
					return (
						token.end !== token.parent.end || // if end is not equal, this is part of the type arguments list
						!isJsxElementOrFragment(token.parent.parent)
					); // there's only trailing trivia if it's the end of the top element
				case ts.SyntaxKind.JsxClosingElement:
				case ts.SyntaxKind.JsxClosingFragment:
					// there's only trailing trivia if it's the end of the top element
					return !isJsxElementOrFragment(token.parent.parent.parent);
			}
	}
	return true;
}

/**
 * Test if a node is a `JsxElement` or `JsxFragment`.
 *
 * @internal
 */
function isJsxElementOrFragment(
	node: ts.Node
): node is ts.JsxElement | ts.JsxFragment {
	return (
		node.kind === ts.SyntaxKind.JsxElement ||
		node.kind === ts.SyntaxKind.JsxFragment
	);
}

/**
 * Callback type used for {@link forEachComment}.
 *
 * @category Callbacks
 */
export type ForEachCommentCallback = (
	fullText: string,
	comment: ts.CommentRange
) => void;

/**
 * Iterates over all comments owned by `node` or its children.
 *
 * @category Nodes - Other Utilities
 * @example
 * ```ts
 * declare const node: ts.Node;
 *
 * tsutils.forEachComment(node, (fullText, comment) => {
 *    console.log(`Found comment at position ${comment.pos}: '${fullText}'.`);
 * });
 * ```
 */
export function forEachComment(
	node: ts.Node,
	callback: ForEachCommentCallback,
	sourceFile: ts.SourceFile = node.getSourceFile()
): void {
	/* Visit all tokens and skip trivia.
       Comment ranges between tokens are parsed without the need of a scanner.
       forEachTokenWithWhitespace does intentionally not pay attention to the correct comment ownership of nodes as it always
       scans all trivia before each token, which could include trailing comments of the previous token.
       Comment ownership is done right in this function*/
	const fullText = sourceFile.text;
	const notJsx = sourceFile.languageVariant !== ts.LanguageVariant.JSX;
	return forEachToken(
		node,
		(token) => {
			if (token.pos === token.end) return;
			if (token.kind !== ts.SyntaxKind.JsxText)
				ts.forEachLeadingCommentRange(
					fullText,
					// skip shebang at position 0
					token.pos === 0 ? (ts.getShebang(fullText) ?? "").length : token.pos,
					commentCallback
				);
			if (notJsx || canHaveTrailingTrivia(token))
				return ts.forEachTrailingCommentRange(
					fullText,
					token.end,
					commentCallback
				);
		},
		sourceFile
	);
	function commentCallback(pos: number, end: number, kind: ts.CommentKind) {
		callback(fullText, { pos, end, kind });
	}
}
