// Code largely based on ajafff/tsutils:
// https://github.com/ajafff/tsutils/blob/03b4df15d14702f9c7a128ac3fae77171778d613/util/util.ts
// Original license MIT:
// https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";

/**
 * Iterate over all tokens of `node`
 *
 * @param node The node whose tokens should be visited
 * @param cb Is called for every token contained in `node`
 */
export function forEachToken(
	node: ts.Node,
	cb: (node: ts.Node) => void,
	sourceFile: ts.SourceFile = node.getSourceFile()
) {
	const queue = [];
	while (true) {
		if (ts.isTokenKind(node.kind)) {
			cb(node);
			// TODO: Investigate?
			// eslint-disable-next-line deprecation/deprecation
		} else if (node.kind !== ts.SyntaxKind.JSDocComment) {
			const children = node.getChildren(sourceFile);
			if (children.length === 1) {
				node = children[0];
				continue;
			}
			for (let i = children.length - 1; i >= 0; --i) queue.push(children[i]); // add children in reverse order, when we pop the next element from the queue, it's the first child
		}
		if (queue.length === 0) break;
		node = queue.pop()!;
	}
}
