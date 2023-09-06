// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import ts from "typescript";

import { UsageWalker } from "./UsageWalker";
import { VariableInfo } from "./variables";

export function collectVariableUsage(
	sourceFile: ts.SourceFile,
): Map<ts.Identifier, VariableInfo> {
	return new UsageWalker().getUsage(sourceFile);
}
