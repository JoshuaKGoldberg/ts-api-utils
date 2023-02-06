// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";

function isFlagSet(obj: { flags: number }, flag: number) {
	return (obj.flags & flag) !== 0;
}

export const isNodeFlagSet: (node: ts.Node, flag: ts.NodeFlags) => boolean =
	isFlagSet;
export const isTypeFlagSet: (type: ts.Type, flag: ts.TypeFlags) => boolean =
	isFlagSet;
export const isSymbolFlagSet: (
	symbol: ts.Symbol,
	flag: ts.SymbolFlags
) => boolean = isFlagSet;

export function isModifierFlagSet(node: ts.Node, flag: ts.ModifierFlags) {
	return (ts.getCombinedModifierFlags(node as ts.Declaration) & flag) !== 0;
}

export function isObjectFlagSet(
	objectType: ts.ObjectType,
	flag: ts.ObjectFlags
) {
	return (objectType.objectFlags & flag) !== 0;
}
