import ts from "typescript";

import { UsageWalker } from "./UsageWalker";

export function collectVariableUsage(sourceFile: ts.SourceFile) {
	return new UsageWalker().getUsage(sourceFile);
}
