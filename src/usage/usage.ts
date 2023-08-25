import ts from "typescript";

export const enum UsageDomain {
	Namespace = 1,
	Type = 2,
	Value = 4,
	ValueOrNamespace = Value | Namespace,
	Any = Namespace | Type | Value,
	TypeQuery = 8,
}

// TODO handle cases where values are used only for their types, e.g. `declare [propSymbol]: number`
export function getUsageDomain(node: ts.Identifier): UsageDomain | undefined {
	const parent = node.parent;
	switch (parent.kind) {
		case ts.SyntaxKind.TypeReference:
			return node.originalKeywordKind !== ts.SyntaxKind.ConstKeyword
				? UsageDomain.Type
				: undefined;
		case ts.SyntaxKind.ExpressionWithTypeArguments:
			return (<ts.HeritageClause>parent.parent).token ===
				ts.SyntaxKind.ImplementsKeyword ||
				parent.parent.parent.kind === ts.SyntaxKind.InterfaceDeclaration
				? UsageDomain.Type
				: UsageDomain.Value;
		case ts.SyntaxKind.TypeQuery:
			return UsageDomain.ValueOrNamespace | UsageDomain.TypeQuery;
		case ts.SyntaxKind.QualifiedName:
			if ((<ts.QualifiedName>parent).left === node) {
				if (
					getEntityNameParent(<ts.QualifiedName>parent).kind ===
					ts.SyntaxKind.TypeQuery
				)
					return UsageDomain.Namespace | UsageDomain.TypeQuery;
				return UsageDomain.Namespace;
			}
			break;
		case ts.SyntaxKind.ExportSpecifier:
			// either {name} or {propertyName as name}
			if (
				(<ts.ExportSpecifier>parent).propertyName === undefined ||
				(<ts.ExportSpecifier>parent).propertyName === node
			)
				return UsageDomain.Any; // TODO handle type-only exports
			break;
		case ts.SyntaxKind.ExportAssignment:
			return UsageDomain.Any;
		// Value
		case ts.SyntaxKind.BindingElement:
			if ((<ts.BindingElement>parent).initializer === node)
				return UsageDomain.ValueOrNamespace;
			break;
		case ts.SyntaxKind.Parameter:
		case ts.SyntaxKind.EnumMember:
		case ts.SyntaxKind.PropertyDeclaration:
		case ts.SyntaxKind.VariableDeclaration:
		case ts.SyntaxKind.PropertyAssignment:
		case ts.SyntaxKind.PropertyAccessExpression:
		case ts.SyntaxKind.ImportEqualsDeclaration:
			if ((<ts.NamedDeclaration>parent).name !== node)
				return UsageDomain.ValueOrNamespace; // TODO handle type-only imports
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
	while (parent.kind === ts.SyntaxKind.QualifiedName) parent = parent.parent!;
	return parent;
}
