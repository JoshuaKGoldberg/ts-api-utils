// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import { NonRootScope } from "./NonRootScope";
import { Scope, ScopeBoundary } from "./Scope";
import { VariableUse } from "./variables";

export const enum ConditionalTypeScopeState {
	Initial,
	Extends,
	TrueType,
	FalseType,
}

export class ConditionalTypeScope extends NonRootScope {
	#state = ConditionalTypeScopeState.Initial;

	constructor(parent: Scope) {
		super(parent, ScopeBoundary.ConditionalType);
	}

	updateState(newState: ConditionalTypeScopeState) {
		this.#state = newState;
	}

	addUse(use: VariableUse) {
		if (this.#state === ConditionalTypeScopeState.TrueType)
			return void this.uses.push(use);
		return this.parent.addUse(use, this);
	}
}
