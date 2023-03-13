// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import ts from "typescript";

/**
 * Test of the kind given is for assignment.
 *
 * @category Syntax Utilities
 * @example
 * ```ts
 * declare const kind: ts.SyntaxKind;
 *
 * isAssignmentKind(kind);
 * ```
 */
export function isAssignmentKind(kind: ts.SyntaxKind): boolean {
	return (
		kind >= ts.SyntaxKind.FirstAssignment &&
		kind <= ts.SyntaxKind.LastAssignment
	);
}

/**
 * Test if a string is numeric.
 *
 * @category Syntax Utilities
 * @example
 * ```ts
 * isNumericPropertyName("abc"); // false
 * isNumericPropertyName("123"); // true
 * ```
 */
export function isNumericPropertyName(name: string | ts.__String): boolean {
	return String(+name) === name;
}

function charSize(ch: number) {
	return ch >= 0x10000 ? 2 : 1;
}

/**
 * Determines whether the given text can be used to access a property with a `PropertyAccessExpression` while preserving the property's name.
 *
 * @category Syntax Utilities
 * @example
 * ```ts
 * isValidPropertyAccess("abc"); // true
 * isValidPropertyAccess("123"); // false
 * ```
 */
export function isValidPropertyAccess(
	text: string,
	languageVersion = ts.ScriptTarget.Latest
): boolean {
	if (text.length === 0) return false;
	let ch = text.codePointAt(0)!;
	if (!ts.isIdentifierStart(ch, languageVersion)) return false;
	for (let i = charSize(ch); i < text.length; i += charSize(ch)) {
		ch = text.codePointAt(i)!;
		if (!ts.isIdentifierPart(ch, languageVersion)) return false;
	}
	return true;
}
