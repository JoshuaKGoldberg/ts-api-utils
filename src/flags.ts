// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";

function isFlagSet(allFlags: number, flag: number): boolean {
	return (allFlags & flag) !== 0;
}

function isFlagSetOnObject(obj: { flags: number }, flag: number): boolean {
	return isFlagSet(obj.flags, flag);
}

export function isModifierFlagSet(
	node: ts.Declaration,
	flag: ts.ModifierFlags
): boolean {
	return isFlagSet(ts.getCombinedModifierFlags(node), flag);
}

export const isNodeFlagSet: (node: ts.Node, flag: ts.NodeFlags) => boolean =
	isFlagSetOnObject;

export function isObjectFlagSet(
	objectType: ts.ObjectType,
	flag: ts.ObjectFlags
): boolean {
	return isFlagSet(objectType.objectFlags, flag);
}

export const isSymbolFlagSet: (
	symbol: ts.Symbol,
	flag: ts.SymbolFlags
) => boolean = isFlagSetOnObject;

export const isTypeFlagSet: (type: ts.Type, flag: ts.TypeFlags) => boolean =
	isFlagSetOnObject;
