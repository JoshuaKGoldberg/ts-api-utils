import ts from "typescript";

import { DeclarationDomain, DeclarationInfo } from "./declarations";
import { Scope } from "./Scope";
import { UsageDomain } from "./usage";

export type VariableCallback = (
	variable: VariableInfo,
	key: ts.Identifier,
	scope: Scope,
) => void;

export interface VariableInfo {
	declarations: ts.Identifier[];
	domain: DeclarationDomain;
	exported: boolean;
	inGlobalScope: boolean;
	uses: VariableUse[];
}

export interface VariableUse {
	domain: UsageDomain;
	location: ts.Identifier;
}

export interface InternalVariableInfo {
	declarations: DeclarationInfo[];
	domain: DeclarationDomain;
	uses: VariableUse[];
}
