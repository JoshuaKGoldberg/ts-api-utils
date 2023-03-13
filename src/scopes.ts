// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import ts from "typescript";

/**
 * Is the node a scope boundary, specifically due to it being a function.
 *
 * @category Scope Utilities
 * @example
 * ```ts
 * declare const node: ts.Node;
 *
 * if (isFunctionScopeBoundary(node, ts.ObjectFlags.Anonymous)) {
 *   // ...
 * }
 * ```
 */
export function isFunctionScopeBoundary(node: ts.Node): boolean {
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
			return true;
		case ts.SyntaxKind.SourceFile:
			// if SourceFile is no module, it contributes to the global scope and is therefore no scope boundary
			return ts.isExternalModule(node as ts.SourceFile);
		default:
			return false;
	}
}
