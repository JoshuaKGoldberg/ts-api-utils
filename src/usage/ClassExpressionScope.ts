import ts from "typescript";

import { AbstractNamedExpressionScope } from "./AbstractNamedExpressionScope";
import { DeclarationDomain } from "./declarations";
import { NonRootScope } from "./NonRootScope";
import { Scope, ScopeBoundary } from "./Scope";

export class ClassExpressionScope extends AbstractNamedExpressionScope<NonRootScope> {
	protected innerScope = new NonRootScope(this, ScopeBoundary.Function);

	constructor(name: ts.Identifier, parent: Scope) {
		super(name, DeclarationDomain.Value | DeclarationDomain.Type, parent);
	}
}
