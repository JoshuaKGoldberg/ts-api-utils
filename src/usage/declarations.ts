// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";

import { identifierToKeywordKind } from "./utils";

/**
 * Which "domain"(s) (most commonly, type or value space) a declaration is within.
 */
export enum DeclarationDomain {
	Namespace = 1,
	Type = 2,
	Value = 4,
	Any = Namespace | Type | Value,

	Import = 8,
}

/**
 * Metadata for how a declaration was declared and/or referenced.
 */
export interface DeclarationInfo {
	declaration: ts.PropertyName;
	domain: DeclarationDomain;
	exported: boolean;
}

export function getDeclarationDomain(
	node: ts.Identifier,
): DeclarationDomain | undefined {
	switch (node.parent.kind) {
		case ts.SyntaxKind.ClassDeclaration:
		case ts.SyntaxKind.ClassExpression:
			return DeclarationDomain.Type | DeclarationDomain.Value;
		case ts.SyntaxKind.EnumDeclaration:
			return DeclarationDomain.Any;
		case ts.SyntaxKind.FunctionDeclaration:
		case ts.SyntaxKind.FunctionExpression:
			return DeclarationDomain.Value;
		case ts.SyntaxKind.ImportClause:
		case ts.SyntaxKind.NamespaceImport:
			return DeclarationDomain.Any | DeclarationDomain.Import; // TODO handle type-only imports
		case ts.SyntaxKind.ImportEqualsDeclaration:
		case ts.SyntaxKind.ImportSpecifier:
			return (node.parent as ts.ImportEqualsDeclaration | ts.ImportSpecifier)
				.name === node
				? DeclarationDomain.Any | DeclarationDomain.Import // TODO handle type-only imports
				: undefined;
		case ts.SyntaxKind.InterfaceDeclaration:
		case ts.SyntaxKind.TypeAliasDeclaration:
		case ts.SyntaxKind.TypeParameter:
			return DeclarationDomain.Type;

		case ts.SyntaxKind.ModuleDeclaration:
			return DeclarationDomain.Namespace;
		case ts.SyntaxKind.Parameter:
			if (
				node.parent.parent.kind === ts.SyntaxKind.IndexSignature ||
				identifierToKeywordKind(node) === ts.SyntaxKind.ThisKeyword
			) {
				return;
			}
		// falls through
		case ts.SyntaxKind.BindingElement:
		case ts.SyntaxKind.VariableDeclaration:
			return (node.parent as ts.VariableLikeDeclaration).name === node
				? DeclarationDomain.Value
				: undefined;
	}
}
