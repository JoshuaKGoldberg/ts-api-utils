import ts from "typescript";
import { describe, expect, it, vitest } from "vitest";

import { forEachComment } from "./comments";
import { createNodeAndSourceFile } from "./test/utils";
import { isTsVersionAtLeast } from "./utils";

describe("forEachComment", () => {
	it("does not call the callback when the source has no comments", () => {
		const { node, sourceFile } = createNodeAndSourceFile("let value;");
		const callback = vitest.fn();

		forEachComment(node, callback, sourceFile);

		expect(callback).not.toHaveBeenCalled();
	});

	if (isTsVersionAtLeast(4, 3)) {
		it("calls the callback when the source has a leading comment", () => {
			const { node, sourceFile } = createNodeAndSourceFile(`
            // hello world
            let value;
        `);
			const callback = vitest.fn();

			forEachComment(node, callback, sourceFile);

			expect(callback).toHaveBeenCalledWith(
				sourceFile.getFullText(),
				expect.objectContaining({
					kind: ts.SyntaxKind.SingleLineCommentTrivia,
				}),
			);
		});

		it("calls the callback when the source has a trailing comment", () => {
			const { node, sourceFile } = createNodeAndSourceFile(`
            let value; // hello world
        `);
			const callback = vitest.fn();

			forEachComment(node, callback, sourceFile);

			expect(callback).toHaveBeenCalledWith(
				sourceFile.getFullText(),
				expect.objectContaining({
					kind: ts.SyntaxKind.SingleLineCommentTrivia,
				}),
			);
		});
	}
});
