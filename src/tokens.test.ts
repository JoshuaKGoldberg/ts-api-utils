import ts from "typescript";
import { describe, expect, it, vitest } from "vitest";

import { createNodeAndSourceFile } from "./test/utils";
import { forEachToken, iterateTokens } from "./tokens";

describe("iterateTokens", () => {
	it("Should iterate all tokens", () => {
		const { node, sourceFile } = createNodeAndSourceFile("let value;");
		const generator = iterateTokens(node, sourceFile);
		expect(typeof generator[Symbol.iterator]).toBe("function");

		const tokens = [...generator];
		expect(tokens.length).toBe(3);
		expect(tokens.every((token) => ts.isTokenKind(token.kind))).toBe(true);
		expect(generator.next()).toEqual({ done: true, value: undefined });
	});
});

describe("forEachToken", () => {
	it("Should iterate all tokens", () => {
		const { node, sourceFile } = createNodeAndSourceFile("let value;");
		const callback = vitest.fn();

		forEachToken(node, callback, sourceFile);

		expect(callback).toBeCalledTimes(3);
	});
});
