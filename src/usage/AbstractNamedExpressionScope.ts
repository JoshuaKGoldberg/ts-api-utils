// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import ts from "typescript";

import { DeclarationDomain } from "./declarations";
import { NonRootScope } from "./NonRootScope";
import { Scope, ScopeBoundary } from "./Scope";
import { VariableCallback, VariableUse } from "./variables";

export abstract class AbstractNamedExpressionScope<
	T extends NonRootScope,
> extends NonRootScope {
	protected abstract get innerScope(): T;

	#name: ts.Identifier;
	#domain: DeclarationDomain;

	constructor(name: ts.Identifier, domain: DeclarationDomain, parent: Scope) {
		super(parent, ScopeBoundary.Function);
		this.#name = name;
		this.#domain = domain;
	}

	end(cb: VariableCallback) {
		this.innerScope.end(cb);
		return cb(
			{
				declarations: [this.#name],
				domain: this.#domain,
				exported: false,
				uses: this.uses,
				inGlobalScope: false,
			},
			this.#name,
			this,
		);
	}

	addUse(use: VariableUse, source?: Scope) {
		if (source !== this.innerScope) return this.innerScope.addUse(use);
		if (use.domain & this.#domain && use.location.text === this.#name.text) {
			this.uses.push(use);
		} else {
			return this.parent.addUse(use, this);
		}
	}

	getFunctionScope() {
		return this.innerScope;
	}

	getDestinationScope() {
		return this.innerScope;
	}
}
