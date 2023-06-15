import ts from "typescript";
import { describe, expect, it } from "vitest";

import { createSourceFileAndTypeChecker } from "../test/utils";
import { isTsVersionAtLeast } from "../utils";
import {
	getCallSignaturesOfType,
	getWellKnownSymbolPropertyOfType,
} from "./getters";

describe("getCallSignaturesOfType", () => {
	it("returns one call signature when one exists", () => {
		const { sourceFile, typeChecker } = createSourceFileAndTypeChecker(`
			declare const x: {
				(): void;
			};
		`);

		const node = (sourceFile.statements[0] as ts.VariableStatement)
			.declarationList.declarations[0].name;

		const type = typeChecker.getTypeAtLocation(node);

		expect(getCallSignaturesOfType(type)).toHaveLength(1);
	});

	it("returns two call signatures when two exist in one object", () => {
		const { sourceFile, typeChecker } = createSourceFileAndTypeChecker(`
			declare const x: {
				(): void;
				(value: string): void;
			};
		`);

		const node = (sourceFile.statements[0] as ts.VariableStatement)
			.declarationList.declarations[0].name;

		const type = typeChecker.getTypeAtLocation(node);

		expect(getCallSignaturesOfType(type)).toHaveLength(2);
	});

	it("returns two call signatures when two exist across two objects in a union", () => {
		const { sourceFile, typeChecker } = createSourceFileAndTypeChecker(`
			declare const x: 
				| { (): void; }
				| { (value: string): void; }
			;
		`);

		const node = (sourceFile.statements[0] as ts.VariableStatement)
			.declarationList.declarations[0].name;

		const type = typeChecker.getTypeAtLocation(node);

		expect(getCallSignaturesOfType(type)).toHaveLength(2);
	});
});

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
