// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import ts from "typescript";

/**
 * Test if the given iterable includes a modifier of any of the given kinds.
 *
 * @category Modifier Utilities
 * @example
 * ```ts
 * declare const modifiers: ts.Modifier[];
 *
 * includesModifier(modifiers, ts.SyntaxKind.AbstractKeyword);
 * ```
 */
export function includesModifier(
	modifiers: Iterable<ts.ModifierLike> | undefined,
	...kinds: ts.ModifierSyntaxKind[]
): boolean {
	if (modifiers === undefined) return false;
	for (const modifier of modifiers)
		if (kinds.includes(modifier.kind as ts.ModifierSyntaxKind)) return true;
	return false;
}
