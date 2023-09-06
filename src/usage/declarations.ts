// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import ts from "typescript";

export interface DeclarationInfo {
	declaration: ts.PropertyName;
	domain: DeclarationDomain;
	exported: boolean;
}

export const enum DeclarationDomain {
	Namespace = 1,
	Type = 2,
	Value = 4,
	Import = 8,
	Any = Namespace | Type | Value,
}

export function getDeclarationDomain(
	node: ts.Identifier,
): DeclarationDomain | undefined {
	switch (node.parent.kind) {
		case ts.SyntaxKind.TypeParameter:
		case ts.SyntaxKind.InterfaceDeclaration:
		case ts.SyntaxKind.TypeAliasDeclaration:
			return DeclarationDomain.Type;
		case ts.SyntaxKind.ClassDeclaration:
		case ts.SyntaxKind.ClassExpression:
			return DeclarationDomain.Type | DeclarationDomain.Value;
		case ts.SyntaxKind.EnumDeclaration:
			return DeclarationDomain.Any;
		case ts.SyntaxKind.NamespaceImport:
		case ts.SyntaxKind.ImportClause:
			return DeclarationDomain.Any | DeclarationDomain.Import; // TODO handle type-only imports
		case ts.SyntaxKind.ImportEqualsDeclaration:
		case ts.SyntaxKind.ImportSpecifier:
			return (<ts.ImportEqualsDeclaration | ts.ImportSpecifier>node.parent)
				.name === node
				? DeclarationDomain.Any | DeclarationDomain.Import // TODO handle type-only imports
				: undefined;
		case ts.SyntaxKind.ModuleDeclaration:
			return DeclarationDomain.Namespace;
		case ts.SyntaxKind.Parameter:
			if (
				node.parent.parent.kind === ts.SyntaxKind.IndexSignature ||
				ts.identifierToKeywordKind(node) === ts.SyntaxKind.ThisKeyword
			)
				return;
		// falls through
		case ts.SyntaxKind.BindingElement:
		case ts.SyntaxKind.VariableDeclaration:
			return (<ts.VariableLikeDeclaration>node.parent).name === node
				? DeclarationDomain.Value
				: undefined;
		case ts.SyntaxKind.FunctionDeclaration:
		case ts.SyntaxKind.FunctionExpression:
			return DeclarationDomain.Value;
	}
}
