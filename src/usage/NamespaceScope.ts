import ts from "typescript";

import { DeclarationInfo, getDeclarationDomain } from "./declarations";
import { EnumScope } from "./EnumScope";
import { NonRootScope } from "./NonRootScope";
import { Scope, ScopeBoundary } from "./Scope";
import { VariableCallback, VariableUse } from "./variables";

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

	finish(cb: VariableCallback) {
		return super.end(cb);
	}

	end(cb: VariableCallback) {
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

	addUse(use: VariableUse, source?: Scope) {
		if (source !== this.#innerScope) return this.#innerScope.addUse(use);
		this.uses.push(use);
	}

	refresh(ambient: boolean, hasExport: boolean) {
		this.#ambient = ambient;
		this.#hasExport = hasExport;
	}

	markExported(name: ts.Identifier) {
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
