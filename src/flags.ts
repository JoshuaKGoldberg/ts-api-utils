// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import ts from "typescript";

/**
 * Test if the given node has the given `ModifierFlags` set.
 * @category Nodes - Flag Utilities
 * @example
 * ```ts
 * declare const node: ts.Node;
 *
 * if (isModifierFlagSet(node, ts.ModifierFlags.Abstract)) {
 *   // ...
 * }
 * ```
 */
export function isModifierFlagSet(
	node: ts.Declaration,
	flag: ts.ModifierFlags,
): boolean {
	return isFlagSet(ts.getCombinedModifierFlags(node), flag);
}

/**
 * Test if the given flag is set on the combined flags.
 * @internal
 */
function isFlagSet(allFlags: number, flag: number): boolean {
	return (allFlags & flag) !== 0;
}

/**
 * Test if the given flag is set on the given object.
 * @internal
 */
function isFlagSetOnObject(obj: { flags: number }, flag: number): boolean {
	return isFlagSet(obj.flags, flag);
}

/**
 * Test if the given node has the given `NodeFlags` set.
 * @category Nodes - Flag Utilities
 * @example
 * ```ts
 * declare const node: ts.Node;
 *
 * if (isNodeFlagSet(node, ts.NodeFlags.AwaitContext)) {
 *   // ...
 * }
 * ```
 */
export const isNodeFlagSet: (node: ts.Node, flag: ts.NodeFlags) => boolean =
	isFlagSetOnObject;

/**
 * Test if the given node has the given `ObjectFlags` set.
 * @category Nodes - Flag Utilities
 * @example
 * ```ts
 * declare const node: ts.Node;
 *
 * if (isObjectFlagSet(node, ts.ObjectFlags.Anonymous)) {
 *   // ...
 * }
 * ```
 */
export function isObjectFlagSet(
	objectType: ts.ObjectType,
	flag: ts.ObjectFlags,
): boolean {
	return isFlagSet(objectType.objectFlags, flag);
}

/**
 * Test if the given node has the given `SymbolFlags` set.
 * @category Nodes - Flag Utilities
 * @example
 * ```ts
 * declare const symbol: ts.Symbol;
 *
 * if (isSymbolFlagSet(symbol, ts.SymbolFlags.Accessor)) {
 *   // ...
 * }
 * ```
 */
export const isSymbolFlagSet: (
	symbol: ts.Symbol,
	flag: ts.SymbolFlags,
) => boolean = isFlagSetOnObject;

/**
 * Test if the given symbol's links has the given `CheckFlags` set.
 * @internal
 */
export function isTransientSymbolLinksFlagSet(
	links: ts.TransientSymbolLinks,
	flag: ts.CheckFlags,
): boolean {
	return isFlagSet(links.checkFlags, flag);
}

/**
 * Test if the given node has the given `TypeFlags` set.
 * @category Nodes - Flag Utilities
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isTypeFlagSet(type, ts.TypeFlags.Any)) {
 *   // ...
 * }
 * ```
 */
export const isTypeFlagSet: (type: ts.Type, flag: ts.TypeFlags) => boolean =
	isFlagSetOnObject;
