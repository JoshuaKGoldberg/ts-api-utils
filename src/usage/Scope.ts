import ts from "typescript";

import { isFunctionScopeBoundary } from "../scopes";
import { DeclarationDomain } from "./declarations";
import { EnumScope } from "./EnumScope";
import { NamespaceScope } from "./NamespaceScope";
import {
	InternalVariableInfo,
	VariableCallback,
	VariableUse,
} from "./variables";

export const enum ScopeBoundary {
	None = 0,
	Function = 1,
	Block = 2,
	Type = 4,
	ConditionalType = 8,
}

export const enum ScopeBoundarySelector {
	Function = ScopeBoundary.Function,
	Block = ScopeBoundarySelector.Function | ScopeBoundary.Block,
	Type = ScopeBoundarySelector.Block | ScopeBoundary.Type,
	InferType = ScopeBoundary.ConditionalType,
}

export interface Scope {
	addUse(use: VariableUse, scope?: Scope): void;
	addVariable(
		identifier: string,
		name: ts.PropertyName,
		selector: ScopeBoundarySelector,
		exported: boolean,
		domain: DeclarationDomain,
	): void;
	createOrReuseEnumScope(name: string, exported: boolean): EnumScope;
	createOrReuseNamespaceScope(
		name: string,
		exported: boolean,
		ambient: boolean,
		hasExportStatement: boolean,
	): NamespaceScope;
	end(cb: VariableCallback): void;
	getDestinationScope(selector: ScopeBoundarySelector): Scope;
	getFunctionScope(): Scope;
	getVariables(): Map<string, InternalVariableInfo>;
	markExported(name: ts.Identifier, as?: ts.Identifier): void;
}

export function isBlockScopeBoundary(node: ts.Node): ScopeBoundary {
	switch (node.kind) {
		case ts.SyntaxKind.Block: {
			const parent = node.parent;
			return parent.kind !== ts.SyntaxKind.CatchClause &&
				// blocks inside SourceFile are block scope boundaries
				(parent.kind === ts.SyntaxKind.SourceFile ||
					// blocks that are direct children of a function scope boundary are no scope boundary
					// for example the FunctionBlock is part of the function scope of the containing function
					!isFunctionScopeBoundary(parent))
				? ScopeBoundary.Block
				: ScopeBoundary.None;
		}
		case ts.SyntaxKind.ForStatement:
		case ts.SyntaxKind.ForInStatement:
		case ts.SyntaxKind.ForOfStatement:
		case ts.SyntaxKind.CaseBlock:
		case ts.SyntaxKind.CatchClause:
		case ts.SyntaxKind.WithStatement:
			return ScopeBoundary.Block;
		default:
			return ScopeBoundary.None;
	}
}
