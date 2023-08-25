import { NonRootScope } from "./NonRootScope";
import { Scope, ScopeBoundary } from "./Scope";

export class FunctionScope extends NonRootScope {
	constructor(parent: Scope) {
		super(parent, ScopeBoundary.Function);
	}

	beginBody() {
		this.applyUses();
	}
}
