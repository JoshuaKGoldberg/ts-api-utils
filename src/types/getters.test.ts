import * as ts from "typescript";
import { describe, expect, it } from "vitest";

import { createSourceFileAndTypeChecker } from "../test/utils.js";
import { isTsVersionAtLeast } from "../utils.js";
import { getWellKnownSymbolPropertyOfType } from "./getters.js";

describe("getWellKnownSymbolPropertyOfType", () => {
	it("finds the symbol for an `asyncIterator` property", () => {
		const { sourceFile, typeChecker } = createSourceFileAndTypeChecker(`
			declare const x: {
				[Symbol.asyncIterator](): AsyncIterator<any>;
			}>
		`);

		const node = (sourceFile.statements[0] as ts.VariableStatement)
			.declarationList.declarations[0].name;

		const type = typeChecker.getTypeAtLocation(node);

		expect(
			getWellKnownSymbolPropertyOfType(type, "asyncIterator", typeChecker)
		).toMatchObject({
			name: /^__@asyncIterator/,
		});
	});

	if (isTsVersionAtLeast(4, 3)) {
		// https://github.com/JoshuaKGoldberg/ts-api-tools/issues/15
		it("finds the symbol for an `asyncIterator` property when that property isn't directly on the type", () => {
			const { sourceFile, typeChecker } = createSourceFileAndTypeChecker(`
			declare const x: Omit<{
				[Symbol.asyncIterator](): AsyncIterator<any>;
			}, 'z'>
		`);

			const node = (sourceFile.statements[0] as ts.VariableStatement)
				.declarationList.declarations[0].name;

			const type = typeChecker.getTypeAtLocation(node);

			expect(
				getWellKnownSymbolPropertyOfType(type, "asyncIterator", typeChecker)
			).toMatchObject({
				name: /^__@asyncIterator/,
			});
		});
	}
});
