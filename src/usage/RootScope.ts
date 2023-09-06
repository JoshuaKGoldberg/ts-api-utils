// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import ts from "typescript";

import { AbstractScope } from "./AbstractScope";
import { DeclarationDomain } from "./declarations";
import { NonRootScope } from "./NonRootScope";
import { Scope, ScopeBoundary, ScopeBoundarySelector } from "./Scope";
import { VariableCallback, VariableUse } from "./variables";

export class RootScope extends AbstractScope {
	#exportAll: boolean;
	#exports: string[] | undefined = undefined;
	#innerScope = new NonRootScope(this, ScopeBoundary.Function);

	constructor(exportAll: boolean, global: boolean) {
		super(global);
		this.#exportAll = exportAll;
	}

	addVariable(
		identifier: string,
		name: ts.PropertyName,
		selector: ScopeBoundarySelector,
		exported: boolean,
		domain: DeclarationDomain,
	) {
		if (domain & DeclarationDomain.Import)
			return super.addVariable(identifier, name, selector, exported, domain);
		return this.#innerScope.addVariable(
			identifier,
			name,
			selector,
			exported,
			domain,
		);
	}

	addUse(use: VariableUse, origin?: Scope) {
		if (origin === this.#innerScope) return super.addUse(use);
		return this.#innerScope.addUse(use);
	}

	markExported(id: ts.Identifier) {
		if (this.#exports === undefined) {
			this.#exports = [id.text];
		} else {
			this.#exports.push(id.text);
		}
	}

	end(cb: VariableCallback) {
		this.#innerScope.end((value, key) => {
			value.exported =
				value.exported ||
				this.#exportAll ||
				(this.#exports !== undefined && this.#exports.includes(key.text));
			value.inGlobalScope = this.global;
			return cb(value, key, this);
		});
		return super.end((value, key, scope) => {
			value.exported =
				value.exported ||
				(scope === this &&
					this.#exports !== undefined &&
					this.#exports.includes(key.text));
			return cb(value, key, scope);
		});
	}

	getDestinationScope() {
		return this;
	}
}
