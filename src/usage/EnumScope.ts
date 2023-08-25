import { NonRootScope } from "./NonRootScope";
import { Scope, ScopeBoundary } from "./Scope";

export class EnumScope extends NonRootScope {
	constructor(parent: Scope) {
		super(parent, ScopeBoundary.Function);
	}

	end() {
		this.applyUses();
	}
}
