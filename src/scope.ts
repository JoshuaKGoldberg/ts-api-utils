// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";

export const enum ScopeBoundary {
	None = 0,
	Function = 1,
	Block = 2,
	Type = 4,
	ConditionalType = 8,
}

export function isFunctionScopeBoundary(node: ts.Node): ScopeBoundary {
	switch (node.kind) {
		case ts.SyntaxKind.FunctionExpression:
		case ts.SyntaxKind.ArrowFunction:
		case ts.SyntaxKind.Constructor:
		case ts.SyntaxKind.ModuleDeclaration:
		case ts.SyntaxKind.ClassDeclaration:
		case ts.SyntaxKind.ClassExpression:
		case ts.SyntaxKind.EnumDeclaration:
		case ts.SyntaxKind.MethodDeclaration:
		case ts.SyntaxKind.FunctionDeclaration:
		case ts.SyntaxKind.GetAccessor:
		case ts.SyntaxKind.SetAccessor:
		case ts.SyntaxKind.MethodSignature:
		case ts.SyntaxKind.CallSignature:
		case ts.SyntaxKind.ConstructSignature:
		case ts.SyntaxKind.ConstructorType:
		case ts.SyntaxKind.FunctionType:
			return ScopeBoundary.Function;
		case ts.SyntaxKind.SourceFile:
			// if SourceFile is no module, it contributes to the global scope and is therefore no scope boundary
			return ts.isExternalModule(node as ts.SourceFile)
				? ScopeBoundary.Function
				: ScopeBoundary.None;
		default:
			return ScopeBoundary.None;
	}
}
