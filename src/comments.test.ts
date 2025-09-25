import ts from "typescript";
import { describe, expect, it, vitest } from "vitest";

import { forEachComment, iterateComments } from "./comments";
import { createNodeAndSourceFile } from "./test/utils";

describe("iterateComments", () => {
	it("Should iterate all comments", () => {
		const { node, sourceFile } = createNodeAndSourceFile(`
			// hello world
			let value;
		`);

		const generator = iterateComments(node, sourceFile);
		expect(typeof generator[Symbol.iterator]).toBe("function");

		expect([...generator]).toEqual([
			{
				end: 18,
				fullText: sourceFile.getFullText(),
				kind: ts.SyntaxKind.SingleLineCommentTrivia,
				pos: 4,
				text: "// hello world",
			},
		]);
		expect(generator.next()).toEqual({ done: true, value: undefined });
	});
});

// TODO: Move tests into `iterateComments`
describe("forEachComment", () => {
	it("does not call the callback when the source is a variable with no comments", () => {
		const { node, sourceFile } = createNodeAndSourceFile("let value;");
		const callback = vitest.fn();

		forEachComment(node, callback, sourceFile);

		expect(callback).not.toHaveBeenCalled();
	});

	it("calls the callback when the source is a variable with a leading comment", () => {
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

	it("calls the callback when the source is a inside a JSX element with a leading comment", () => {
		const { node, sourceFile } = createNodeAndSourceFile(`
			let value = (
				<div>
				{
					// hello world	
					'asdf'
				}
				</div>
			);
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

	it("calls the callback when the source is a inside a JSX fragment with a leading comment", () => {
		const { node, sourceFile } = createNodeAndSourceFile(`
			let value = (
				<>
				{
					// hello world	
					'asdf'
				}
				</>
			);
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

	it("calls the callback when the source is a inside a JSX self-closing element with a leading comment", () => {
		const { node, sourceFile } = createNodeAndSourceFile(`
			let value = (
				<div {
				// hello world
				} />
			);
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

	it("calls the callback when the source is a variable with a trailing comment", () => {
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
});
