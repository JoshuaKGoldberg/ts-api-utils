// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import { NonRootScope } from "./NonRootScope";
import { Scope, ScopeBoundary } from "./Scope";

export class BlockScope extends NonRootScope {
	#functionScope: Scope;

	constructor(functionScope: Scope, parent: Scope) {
		super(parent, ScopeBoundary.Block);
		this.#functionScope = functionScope;
	}

	getFunctionScope() {
		return this.#functionScope;
	}
}
