// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

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

	beginBody(): void {
		return this.innerScope.beginBody();
	}
}
