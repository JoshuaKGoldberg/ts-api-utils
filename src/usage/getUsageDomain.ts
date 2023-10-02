// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import ts from "typescript";

import { identifierToKeywordKind } from "./utils";

/**
 * Which "domain"(s) (most commonly, type or value space) a usage is within.
 */
export enum UsageDomain {
	Namespace = 1,
	Type = 2,
	TypeQuery = 8,
	Value = 4,
	ValueOrNamespace = Value | Namespace,
	// eslint-disable-next-line perfectionist/sort-enums
	Any = Namespace | Type | Value,
}

// TODO handle cases where values are used only for their types, e.g. `declare [propSymbol]: number`
export function getUsageDomain(node: ts.Identifier): UsageDomain | undefined {
	const parent = node.parent;
	switch (parent.kind) {
		case ts.SyntaxKind.TypeReference:
			return identifierToKeywordKind(node) !== ts.SyntaxKind.ConstKeyword
				? UsageDomain.Type
				: undefined;
		case ts.SyntaxKind.ExpressionWithTypeArguments:
			return (parent.parent as ts.HeritageClause).token ===
				ts.SyntaxKind.ImplementsKeyword ||
				parent.parent.parent.kind === ts.SyntaxKind.InterfaceDeclaration
				? UsageDomain.Type
				: UsageDomain.Value;
		case ts.SyntaxKind.TypeQuery:
			return UsageDomain.ValueOrNamespace | UsageDomain.TypeQuery;
		case ts.SyntaxKind.QualifiedName:
			if ((parent as ts.QualifiedName).left === node) {
				if (
					getEntityNameParent(parent as ts.QualifiedName).kind ===
					ts.SyntaxKind.TypeQuery
				) {
					return UsageDomain.Namespace | UsageDomain.TypeQuery;
				}

				return UsageDomain.Namespace;
			}

			break;
		case ts.SyntaxKind.ExportSpecifier:
			// either {name} or {propertyName as name}
			if (
				(parent as ts.ExportSpecifier).propertyName === undefined ||
				(parent as ts.ExportSpecifier).propertyName === node
			) {
				return UsageDomain.Any;
			} // TODO handle type-only exports

			break;
		case ts.SyntaxKind.ExportAssignment:
			return UsageDomain.Any;
		// Value
		case ts.SyntaxKind.BindingElement:
			if ((parent as ts.BindingElement).initializer === node) {
				return UsageDomain.ValueOrNamespace;
			}

			break;
		case ts.SyntaxKind.Parameter:
		case ts.SyntaxKind.EnumMember:
		case ts.SyntaxKind.PropertyDeclaration:
		case ts.SyntaxKind.VariableDeclaration:
		case ts.SyntaxKind.PropertyAssignment:
		case ts.SyntaxKind.PropertyAccessExpression:
		case ts.SyntaxKind.ImportEqualsDeclaration:
			if ((parent as ts.NamedDeclaration).name !== node) {
				return UsageDomain.ValueOrNamespace;
			} // TODO handle type-only imports

			break;
		case ts.SyntaxKind.JsxAttribute:
		case ts.SyntaxKind.FunctionDeclaration:
		case ts.SyntaxKind.FunctionExpression:
		case ts.SyntaxKind.NamespaceImport:
		case ts.SyntaxKind.ClassDeclaration:
		case ts.SyntaxKind.ClassExpression:
		case ts.SyntaxKind.ModuleDeclaration:
		case ts.SyntaxKind.MethodDeclaration:
		case ts.SyntaxKind.EnumDeclaration:
		case ts.SyntaxKind.GetAccessor:
		case ts.SyntaxKind.SetAccessor:
		case ts.SyntaxKind.LabeledStatement:
		case ts.SyntaxKind.BreakStatement:
		case ts.SyntaxKind.ContinueStatement:
		case ts.SyntaxKind.ImportClause:
		case ts.SyntaxKind.ImportSpecifier:
		case ts.SyntaxKind.TypePredicate: // TODO this actually references a parameter
		case ts.SyntaxKind.MethodSignature:
		case ts.SyntaxKind.PropertySignature:
		case ts.SyntaxKind.NamespaceExportDeclaration:
		case ts.SyntaxKind.NamespaceExport:
		case ts.SyntaxKind.InterfaceDeclaration:
		case ts.SyntaxKind.TypeAliasDeclaration:
		case ts.SyntaxKind.TypeParameter:
		case ts.SyntaxKind.NamedTupleMember:
			break;
		default:
			return UsageDomain.ValueOrNamespace;
	}
}

function getEntityNameParent(name: ts.EntityName) {
	let parent = name.parent;
	while (parent.kind === ts.SyntaxKind.QualifiedName) {
		parent = parent.parent!;
	}

	return parent;
}
