// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import ts from "typescript";

import type { EnumScope, NamespaceScope } from "./scopes";

import { isFunctionScopeBoundary } from "../scopes";
import { DeclarationDomain } from "./declarations";
import { InternalUsageInfo, Usage, UsageInfoCallback } from "./usage";

export enum ScopeBoundary {
	Block = 2,
	ConditionalType = 8,
	Function = 1,
	None = 0,
	Type = 4,
}

export enum ScopeBoundarySelector {
	Function = ScopeBoundary.Function,

	Block = ScopeBoundarySelector.Function | ScopeBoundary.Block,
	InferType = ScopeBoundary.ConditionalType,
	Type = ScopeBoundarySelector.Block | ScopeBoundary.Type,
}

export interface Scope {
	addUse(use: Usage, scope?: Scope): void;
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
	end(cb: UsageInfoCallback): void;
	getDestinationScope(selector: ScopeBoundarySelector): Scope;
	getFunctionScope(): Scope;
	getVariables(): Map<string, InternalUsageInfo>;
	markExported(name: ts.ModuleExportName, as?: ts.ModuleExportName): void;
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

		case ts.SyntaxKind.CaseBlock:
		case ts.SyntaxKind.CatchClause:
		case ts.SyntaxKind.ForInStatement:
		case ts.SyntaxKind.ForOfStatement:
		case ts.SyntaxKind.ForStatement:
		case ts.SyntaxKind.WithStatement:
			return ScopeBoundary.Block;
		default:
			return ScopeBoundary.None;
	}
}
