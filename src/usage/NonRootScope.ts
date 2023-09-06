// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import { AbstractScope } from "./AbstractScope";
import { Scope, ScopeBoundary, ScopeBoundarySelector } from "./Scope";
import { VariableUse } from "./variables";

export class NonRootScope extends AbstractScope {
	constructor(
		protected parent: Scope,
		protected boundary: ScopeBoundary,
	) {
		super(false);
	}

	getDestinationScope(selector: ScopeBoundarySelector): Scope {
		return this.boundary & selector
			? this
			: this.parent.getDestinationScope(selector);
	}

	protected addUseToParent(use: VariableUse) {
		return this.parent.addUse(use, this);
	}
}
