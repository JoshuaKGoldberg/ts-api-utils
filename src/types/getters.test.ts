import * as ts from "typescript";
import { describe, expect, it } from "vitest";

import { createSourceFileAndTypeChecker } from "../test/utils";
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

	it("returns the call signature when one exists across two objects in an intersection", () => {
		const { sourceFile, typeChecker } = createSourceFileAndTypeChecker(`
			declare const x: 
				& { (): void; }
				& {  }
			;
		`);

		const node = (sourceFile.statements[0] as ts.VariableStatement)
			.declarationList.declarations[0].name;

		const type = typeChecker.getTypeAtLocation(node);

		expect(getCallSignaturesOfType(type)).toHaveLength(1);
	});

	it("returns the call signatures when two exist in one object across two objects in an intersection", () => {
		const { sourceFile, typeChecker } = createSourceFileAndTypeChecker(`
			declare const x: 
				& { (): void; (value: string): void; }
				& {  }
			;
		`);

		const node = (sourceFile.statements[0] as ts.VariableStatement)
			.declarationList.declarations[0].name;

		const type = typeChecker.getTypeAtLocation(node);

		expect(getCallSignaturesOfType(type)).toHaveLength(2);
	});

	it("returns zero call signatures when two exist across two objects in an intersection", () => {
		const { sourceFile, typeChecker } = createSourceFileAndTypeChecker(`
			declare const x: 
				& { (): void; }
				& { (value: string): void; }
			;
		`);

		const node = (sourceFile.statements[0] as ts.VariableStatement)
			.declarationList.declarations[0].name;

		const type = typeChecker.getTypeAtLocation(node);

		expect(getCallSignaturesOfType(type)).toHaveLength(0);
	});
});

describe("getWellKnownSymbolPropertyOfType", () => {
	it("finds the symbol for an `asyncIterator` property", () => {
		const { sourceFile, typeChecker } = createSourceFileAndTypeChecker(`
			declare const x: {
				[Symbol.asyncIterator](): AsyncIterator<any>;
			};
		`);

		const node = (sourceFile.statements[0] as ts.VariableStatement)
			.declarationList.declarations[0].name;

		const type = typeChecker.getTypeAtLocation(node);

		expect(
			getWellKnownSymbolPropertyOfType(type, "asyncIterator", typeChecker),
		).toMatchObject({
			name: /^__@asyncIterator/,
		});
	});

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
			getWellKnownSymbolPropertyOfType(type, "asyncIterator", typeChecker),
		).toMatchObject({
			name: /^__@asyncIterator/,
		});
	});

	it("returns undefined when the type maps over typeof the requested symbol", () => {
		const { sourceFile, typeChecker } = createSourceFileAndTypeChecker(`
			type MapsOverTypeofSymbolIterator = {
				[K in typeof Symbol.iterator]: string;
			};

			declare const hoverStyles: MapsOverTypeofSymbolIterator;

			const testObject = { ...hoverStyles };
		`);

		const node = (sourceFile.statements.at(-1) as ts.VariableStatement)
			.declarationList.declarations[0];

		const type = typeChecker.getTypeAtLocation(node);

		expect(
			getWellKnownSymbolPropertyOfType(type, "iterator", typeChecker),
		).toBe(undefined);
	});

	it("returns undefined when given an error type", () => {
		const { sourceFile, typeChecker } = createSourceFileAndTypeChecker(`
			declare const x: invalid;
		`);

		const node = (sourceFile.statements[0] as ts.VariableStatement)
			.declarationList.declarations[0].name;

		const type = typeChecker.getTypeAtLocation(node);

		expect(
			getWellKnownSymbolPropertyOfType(type, "asyncIterator", typeChecker),
		).toBe(undefined);
	});
});
