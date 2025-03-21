// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";

import { UsageInfo } from "./usage";
import { UsageWalker } from "./UsageWalker";

/**
 * Creates a mapping of each declared type and value to its type information.
 * @category Nodes - Other Utilities
 * @example
 * ```ts
 * declare const sourceFile: ts.SourceFile;
 *
 * const usage = collectVariableUsage(sourceFile);
 *
 * for (const [identifier, information] of usage) {
 * 	console.log(`${identifier.getText()} is used ${information.uses.length} time(s).`);
 * }
 * ```
 */
export function collectVariableUsage(
	sourceFile: ts.SourceFile,
): Map<ts.Identifier, UsageInfo> {
	return new UsageWalker().getUsage(sourceFile);
}
