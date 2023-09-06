// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import ts from "typescript";

import { DeclarationDomain, DeclarationInfo } from "./declarations";
import { EnumScope } from "./EnumScope";
import { NamespaceScope } from "./NamespaceScope";
import { Scope, ScopeBoundarySelector } from "./Scope";
import {
	InternalVariableInfo,
	VariableCallback,
	VariableInfo,
	VariableUse,
} from "./variables";

export abstract class AbstractScope implements Scope {
	protected variables = new Map<string, InternalVariableInfo>();
	protected uses: VariableUse[] = [];
	protected namespaceScopes: Map<string, NamespaceScope> | undefined =
		undefined;
	#enumScopes: Map<string, EnumScope> | undefined = undefined;

	constructor(protected global: boolean) {}

	addVariable(
		identifier: string,
		name: ts.PropertyName,
		selector: ScopeBoundarySelector,
		exported: boolean,
		domain: DeclarationDomain,
	) {
		const variables = this.getDestinationScope(selector).getVariables();
		const declaration: DeclarationInfo = {
			domain,
			exported,
			declaration: name,
		};
		const variable = variables.get(identifier);
		if (variable === undefined) {
			variables.set(identifier, {
				domain,
				declarations: [declaration],
				uses: [],
			});
		} else {
			variable.domain |= domain;
			variable.declarations.push(declaration);
		}
	}

	addUse(use: VariableUse) {
		this.uses.push(use);
	}

	getVariables() {
		return this.variables;
	}

	getFunctionScope(): Scope {
		return this;
	}

	end(cb: VariableCallback) {
		if (this.namespaceScopes !== undefined)
			this.namespaceScopes.forEach((value) => value.finish(cb));
		this.namespaceScopes = this.#enumScopes = undefined;
		this.applyUses();
		this.variables.forEach((variable) => {
			for (const declaration of variable.declarations) {
				const result: VariableInfo = {
					declarations: [],
					domain: declaration.domain,
					exported: declaration.exported,
					inGlobalScope: this.global,
					uses: [],
				};
				for (const other of variable.declarations)
					if (other.domain & declaration.domain)
						result.declarations.push(<ts.Identifier>other.declaration);
				for (const use of variable.uses)
					if (use.domain & declaration.domain) result.uses.push(use);
				cb(result, <ts.Identifier>declaration.declaration, this);
			}
		});
	}

	// tslint:disable-next-line:prefer-function-over-method
	markExported(_name: ts.Identifier) {} // only relevant for the root scope

	createOrReuseNamespaceScope(
		name: string,
		_exported: boolean,
		ambient: boolean,
		hasExportStatement: boolean,
	): NamespaceScope {
		let scope: NamespaceScope | undefined;
		if (this.namespaceScopes === undefined) {
			this.namespaceScopes = new Map();
		} else {
			scope = this.namespaceScopes.get(name);
		}
		if (scope === undefined) {
			scope = new NamespaceScope(ambient, hasExportStatement, this);
			this.namespaceScopes.set(name, scope);
		} else {
			scope.refresh(ambient, hasExportStatement);
		}
		return scope;
	}

	createOrReuseEnumScope(name: string, _exported: boolean): EnumScope {
		let scope: EnumScope | undefined;
		if (this.#enumScopes === undefined) {
			this.#enumScopes = new Map();
		} else {
			scope = this.#enumScopes.get(name);
		}
		if (scope === undefined) {
			scope = new EnumScope(this);
			this.#enumScopes.set(name, scope);
		}
		return scope;
	}

	protected applyUses() {
		for (const use of this.uses)
			if (!this.applyUse(use)) this.addUseToParent(use);
		this.uses = [];
	}

	protected applyUse(use: VariableUse, variables = this.variables): boolean {
		const variable = variables.get(use.location.text);
		if (variable === undefined || (variable.domain & use.domain) === 0)
			return false;
		variable.uses.push(use);
		return true;
	}

	abstract getDestinationScope(selector: ScopeBoundarySelector): Scope;

	protected addUseToParent(_use: VariableUse) {}
}
