// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";

function isFlagSet(obj: { flags: number }, flag: number): boolean {
	return (obj.flags & flag) !== 0;
}

export function isModifierFlagSet(
	node: ts.Declaration,
	flag: ts.ModifierFlags
): boolean {
	return (ts.getCombinedModifierFlags(node) & flag) !== 0;
}

export const isNodeFlagSet: (node: ts.Node, flag: ts.NodeFlags) => boolean =
	isFlagSet;

export function isObjectFlagSet(
	objectType: ts.ObjectType,
	flag: ts.ObjectFlags
): boolean {
	return (objectType.objectFlags & flag) !== 0;
}

export const isSymbolFlagSet: (
	symbol: ts.Symbol,
	flag: ts.SymbolFlags
) => boolean = isFlagSet;

export const isTypeFlagSet: (type: ts.Type, flag: ts.TypeFlags) => boolean =
	isFlagSet;
