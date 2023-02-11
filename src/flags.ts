// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";

function isFlagSet(allFlags: number, ...flags: number[]): boolean {
	return (allFlags & flags.reduce((carry, flag) => carry | flag)) !== 0;
}

function isFlagSetOnObject(
	obj: { flags: number },
	...flags: number[]
): boolean {
	return isFlagSet(obj.flags, ...flags);
}

export function isModifierFlagSet(
	node: ts.Declaration,
	...flags: ts.ModifierFlags[]
): boolean {
	return isFlagSet(ts.getCombinedModifierFlags(node), ...flags);
}

export const isNodeFlagSet: (
	node: ts.Node,
	...flags: ts.NodeFlags[]
) => boolean = isFlagSetOnObject;

export function isObjectFlagSet(
	objectType: ts.ObjectType,
	...flags: ts.ObjectFlags[]
): boolean {
	return isFlagSet(objectType.objectFlags, ...flags);
}

export const isSymbolFlagSet: (
	symbol: ts.Symbol,
	...flags: ts.SymbolFlags[]
) => boolean = isFlagSetOnObject;

export const isTypeFlagSet: (
	type: ts.Type,
	...flags: ts.TypeFlags[]
) => boolean = isFlagSetOnObject;
