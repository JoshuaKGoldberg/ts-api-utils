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
