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
