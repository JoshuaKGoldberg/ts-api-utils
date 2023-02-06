// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";

export function hasModifier(
	modifiers: ts.ModifiersArray | ts.Modifier[] | undefined,
	...kinds: ts.Modifier["kind"][]
) {
	if (modifiers === undefined) return false;
	for (const modifier of modifiers)
		if (kinds.includes(modifier.kind)) return true;
	return false;
}
