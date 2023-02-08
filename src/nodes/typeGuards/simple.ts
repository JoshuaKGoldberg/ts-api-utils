// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";

export function isParameterDeclaration(
	node: ts.Node
): node is ts.ParameterDeclaration {
	return node.kind === ts.SyntaxKind.Parameter;
}
