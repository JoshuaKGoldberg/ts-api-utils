// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";

/**
 * Test if the given flag is set on the given object.
 *
 * @category Nodes - Flag Utilities
 * @param obj
 * @param flag
 * @returns
 */
function isFlagSet(obj: { flags: number }, flag: number): boolean {
	return (obj.flags & flag) !== 0;
}

/**
 * Test if the given node has the given `ModifierFlags` set.
 *
 * @category Nodes - Flag Utilities
 * @param node
 * @param flag
 * @returns
 */
export function isModifierFlagSet(
	node: ts.Declaration,
	flag: ts.ModifierFlags
): boolean {
	return (ts.getCombinedModifierFlags(node) & flag) !== 0;
}

/**
 * Test if the given node has the given `NodeFlags` set.
 *
 * @category Nodes - Flag Utilities
 * @param node
 * @param flag
 * @returns
 */
export const isNodeFlagSet: (node: ts.Node, flag: ts.NodeFlags) => boolean =
	isFlagSet;

/**
 * Test if the given node has the given `ObjectFlags` set.
 *
 * @category Nodes - Flag Utilities
 * @param node
 * @param flag
 * @returns
 */
export function isObjectFlagSet(
	objectType: ts.ObjectType,
	flag: ts.ObjectFlags
): boolean {
	return (objectType.objectFlags & flag) !== 0;
}

/**
 * Test if the given node has the given `SymbolFlags` set.
 *
 * @category Nodes - Flag Utilities
 * @param node
 * @param flag
 * @returns
 */
export const isSymbolFlagSet: (
	symbol: ts.Symbol,
	flag: ts.SymbolFlags
) => boolean = isFlagSet;

/**
 * Test if the given node has the given `TypeFlags` set.
 *
 * @category Nodes - Flag Utilities
 * @param node
 * @param flag
 * @returns
 */
export const isTypeFlagSet: (type: ts.Type, flag: ts.TypeFlags) => boolean =
	isFlagSet;
