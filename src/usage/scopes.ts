// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import ts from "typescript";

import {
	DeclarationDomain,
	DeclarationInfo,
	getDeclarationDomain,
} from "./declarations";
import { Scope, ScopeBoundary, ScopeBoundarySelector } from "./Scope";
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
	): void {
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

	addUse(use: VariableUse): void {
		this.uses.push(use);
	}

	getVariables(): Map<string, InternalVariableInfo> {
		return this.variables;
	}

	getFunctionScope(): Scope {
		return this;
	}

	end(cb: VariableCallback): void {
		if (this.namespaceScopes !== undefined) {
			this.namespaceScopes.forEach((value) => value.finish(cb));
		}

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
	markExported(_name: ts.Identifier): void {} // only relevant for the root scope

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

	protected applyUses(): void {
		for (const use of this.uses) {
			if (!this.applyUse(use)) {
				this.addUseToParent(use);
			}
		}
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

	protected addUseToParent(_use: VariableUse): void {}
}

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

	protected addUseToParent(use: VariableUse): void {
		return this.parent.addUse(use, this);
	}
}

export class EnumScope extends NonRootScope {
	constructor(parent: Scope) {
		super(parent, ScopeBoundary.Function);
	}

	end(): void {
		this.applyUses();
	}
}

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
	): void {
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

	addUse(use: VariableUse, origin?: Scope): void {
		if (origin === this.#innerScope) return super.addUse(use);
		return this.#innerScope.addUse(use);
	}

	markExported(id: ts.Identifier): void {
		if (this.#exports === undefined) {
			this.#exports = [id.text];
		} else {
			this.#exports.push(id.text);
		}
	}

	end(cb: VariableCallback): void {
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

	getDestinationScope(): this {
		return this;
	}
}

export class NamespaceScope extends NonRootScope {
	#innerScope = new NonRootScope(this, ScopeBoundary.Function);
	#exports: Set<string> | undefined = undefined;
	#ambient: boolean;
	#hasExport: boolean;

	constructor(ambient: boolean, hasExport: boolean, parent: Scope) {
		super(parent, ScopeBoundary.Function);
		this.#ambient = ambient;
		this.#hasExport = hasExport;
	}

	finish(cb: VariableCallback): void {
		return super.end(cb);
	}

	end(cb: VariableCallback): void {
		this.#innerScope.end((variable, key, scope) => {
			if (
				scope !== this.#innerScope ||
				(!variable.exported &&
					(!this.#ambient ||
						(this.#exports !== undefined && !this.#exports.has(key.text))))
			)
				return cb(variable, key, scope);
			const namespaceVar = this.variables.get(key.text);
			if (namespaceVar === undefined) {
				this.variables.set(key.text, {
					declarations: variable.declarations.map(mapDeclaration),
					domain: variable.domain,
					uses: [...variable.uses],
				});
			} else {
				outer: for (const declaration of variable.declarations) {
					for (const existing of namespaceVar.declarations)
						if (existing.declaration === declaration) continue outer;
					namespaceVar.declarations.push(mapDeclaration(declaration));
				}
				namespaceVar.domain |= variable.domain;
				for (const use of variable.uses) {
					if (namespaceVar.uses.includes(use)) continue;
					namespaceVar.uses.push(use);
				}
			}
		});
		this.applyUses();
		this.#innerScope = new NonRootScope(this, ScopeBoundary.Function);
	}

	createOrReuseNamespaceScope(
		name: string,
		exported: boolean,
		ambient: boolean,
		hasExportStatement: boolean,
	): NamespaceScope {
		if (!exported && (!this.#ambient || this.#hasExport))
			return this.#innerScope.createOrReuseNamespaceScope(
				name,
				exported,
				ambient || this.#ambient,
				hasExportStatement,
			);
		return super.createOrReuseNamespaceScope(
			name,
			exported,
			ambient || this.#ambient,
			hasExportStatement,
		);
	}

	createOrReuseEnumScope(name: string, exported: boolean): EnumScope {
		if (!exported && (!this.#ambient || this.#hasExport))
			return this.#innerScope.createOrReuseEnumScope(name, exported);
		return super.createOrReuseEnumScope(name, exported);
	}

	addUse(use: VariableUse, source?: Scope): void {
		if (source !== this.#innerScope) return this.#innerScope.addUse(use);
		this.uses.push(use);
	}

	refresh(ambient: boolean, hasExport: boolean): void {
		this.#ambient = ambient;
		this.#hasExport = hasExport;
	}

	markExported(name: ts.Identifier): void {
		if (this.#exports === undefined) this.#exports = new Set();
		this.#exports.add(name.text);
	}

	getDestinationScope(): Scope {
		return this.#innerScope;
	}
}

function mapDeclaration(declaration: ts.Identifier): DeclarationInfo {
	return {
		declaration,
		exported: true,
		domain: getDeclarationDomain(declaration)!,
	};
}

export class FunctionScope extends NonRootScope {
	constructor(parent: Scope) {
		super(parent, ScopeBoundary.Function);
	}

	beginBody(): void {
		this.applyUses();
	}
}

export abstract class AbstractNamedExpressionScope<
	InnerScope extends NonRootScope,
> extends NonRootScope {
	protected abstract get innerScope(): InnerScope;

	#name: ts.Identifier;
	#domain: DeclarationDomain;

	constructor(name: ts.Identifier, domain: DeclarationDomain, parent: Scope) {
		super(parent, ScopeBoundary.Function);
		this.#name = name;
		this.#domain = domain;
	}

	end(cb: VariableCallback): void {
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

	addUse(use: VariableUse, source?: Scope): void {
		if (source !== this.innerScope) return this.innerScope.addUse(use);
		if (use.domain & this.#domain && use.location.text === this.#name.text) {
			this.uses.push(use);
		} else {
			return this.parent.addUse(use, this);
		}
	}

	getFunctionScope(): InnerScope {
		return this.innerScope;
	}

	getDestinationScope(): InnerScope {
		return this.innerScope;
	}
}

export class FunctionExpressionScope extends AbstractNamedExpressionScope<FunctionScope> {
	protected innerScope = new FunctionScope(this);

	constructor(name: ts.Identifier, parent: Scope) {
		super(name, DeclarationDomain.Value, parent);
	}

	beginBody(): void {
		return this.innerScope.beginBody();
	}
}

export class BlockScope extends NonRootScope {
	#functionScope: Scope;

	constructor(functionScope: Scope, parent: Scope) {
		super(parent, ScopeBoundary.Block);
		this.#functionScope = functionScope;
	}

	getFunctionScope(): Scope {
		return this.#functionScope;
	}
}

export class ClassExpressionScope extends AbstractNamedExpressionScope<NonRootScope> {
	protected innerScope = new NonRootScope(this, ScopeBoundary.Function);

	constructor(name: ts.Identifier, parent: Scope) {
		super(name, DeclarationDomain.Value | DeclarationDomain.Type, parent);
	}
}

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

	updateState(newState: ConditionalTypeScopeState): void {
		this.#state = newState;
	}

	addUse(use: VariableUse): void {
		if (this.#state === ConditionalTypeScopeState.TrueType)
			return void this.uses.push(use);
		return this.parent.addUse(use, this);
	}
}
