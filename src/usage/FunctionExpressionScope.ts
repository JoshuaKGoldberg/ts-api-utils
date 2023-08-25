import ts from "typescript";

import { AbstractNamedExpressionScope } from "./AbstractNamedExpressionScope";
import { DeclarationDomain } from "./declarations";
import { FunctionScope } from "./FunctionScope";
import { Scope } from "./Scope";

export class FunctionExpressionScope extends AbstractNamedExpressionScope<FunctionScope> {
	protected innerScope = new FunctionScope(this);

	constructor(name: ts.Identifier, parent: Scope) {
		super(name, DeclarationDomain.Value, parent);
	}

	beginBody() {
		return this.innerScope.beginBody();
	}
}
