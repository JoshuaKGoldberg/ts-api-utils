import ts from "typescript";
import { describe, expect, it } from "vitest";

import { createSourceFileAndTypeChecker } from "../test/utils.js";
import {
	isFalsyType,
	isPropertyReadonlyInType,
	isThenableType,
	symbolHasReadonlyDeclaration,
} from "./utilities.js";

describe("isPropertyReadonlyInType", () => {
	it("returns false when the property is not readonly", () => {
		const { sourceFile, typeChecker } = createSourceFileAndTypeChecker(`
			interface Box {
				 value: string;
			};
		`);
		const node = sourceFile.statements[0] as ts.InterfaceDeclaration;
		const type = typeChecker.getTypeAtLocation(node);

		expect(
			isPropertyReadonlyInType(
				type,
				ts.escapeLeadingUnderscores("value"),
				typeChecker,
			),
		).toBe(false);
	});

	it("returns true when the property is readonly", () => {
		const { sourceFile, typeChecker } = createSourceFileAndTypeChecker(`
			interface Box {
				readonly value: string;
			};
		`);
		const node = sourceFile.statements[0] as ts.InterfaceDeclaration;
		const type = typeChecker.getTypeAtLocation(node);

		expect(
			isPropertyReadonlyInType(
				type,
				ts.escapeLeadingUnderscores("value"),
				typeChecker,
			),
		).toBe(true);
	});

	it("does not crash when the type is a mapped type parameter extending any", () => {
		const { sourceFile, typeChecker } = createSourceFileAndTypeChecker(`
			type MyType<T> = {
				[K in keyof T]: 'cat' | 'dog' | T[K];
			};
			type Test<A extends any[]> = MyType<A>;
		`);
		const node = sourceFile.statements.at(-1) as ts.TypeAliasDeclaration;
		const type = typeChecker.getTypeAtLocation(node);

		expect(
			isPropertyReadonlyInType(
				type,
				ts.escapeLeadingUnderscores("length"),
				typeChecker,
			),
		).toBe(false);
	});
});

describe("symbolHasReadonlyDeclaration", () => {
	it("returns false when the symbol is a let variable", () => {
		const { sourceFile, typeChecker } = createSourceFileAndTypeChecker(`
			interface Box {
				 value: string;
			};

			let box = { value: "" };

			box;
		`);
		const node = sourceFile.statements.at(-1) as ts.ExpressionStatement;
		const symbol = typeChecker.getSymbolAtLocation(node.expression)!;

		expect(symbolHasReadonlyDeclaration(symbol, typeChecker)).toBe(false);
	});

	it("returns true when the symbol is a const", () => {
		const { sourceFile, typeChecker } = createSourceFileAndTypeChecker(`
			interface Box {
				 value: string;
			};

			const box = { value: "" };

			box;
		`);
		const node = sourceFile.statements.at(-1) as ts.ExpressionStatement;
		const symbol = typeChecker.getSymbolAtLocation(node.expression)!;

		expect(symbolHasReadonlyDeclaration(symbol, typeChecker)).toBe(true);
	});

	it.each([
		[false, "[]"],
		[
			true,
			`
				enum Values { a };
				const value = Values.a;
				value;
			`,
		],
		[
			false,
			`
					const Values = { a: ['a'] };
					Values.a = Values.a;
			`,
		],
		[
			false,
			`
					class Box {}
					new Box();
			`,
		],
	])("returns %j when given %s", (expected, source) => {
		const { sourceFile, typeChecker } = createSourceFileAndTypeChecker(source);
		const node = sourceFile.statements.at(-1) as ts.ExpressionStatement;
		const type = typeChecker.getTypeAtLocation(node.expression);
		const symbol = type.getSymbol()!;

		expect(symbolHasReadonlyDeclaration(symbol, typeChecker)).toBe(expected);
	});
});

describe("isFalsyType", () => {
	it.each([
		[false, "{}"],
		[false, "true"],
		[false, '"_"'],
		[true, '""'],
		[true, "false"],
		[true, "0"],
		[true, "null"],
	])("returns %j when given %s", (expected, source) => {
		const { sourceFile, typeChecker } = createSourceFileAndTypeChecker(`
			${source};
		`);
		const node = sourceFile.statements.at(-1) as ts.ExpressionStatement;
		const type = typeChecker.getTypeAtLocation(node.expression);

		expect(isFalsyType(type)).toBe(expected);
	});
});

describe("isThenableType", () => {
	it.each([
		[false, "{}"],
		[false, "{ then: () => {}, }"],
		[true, "{ then: (next: () => void ) => next(), }"],
		[true, "new Promise(() => {})"],
	])("returns %j when given %s", (expected, source) => {
		const { sourceFile, typeChecker } = createSourceFileAndTypeChecker(`
			const value = ${source};
			value;
		`);
		const node = sourceFile.statements.at(-1) as ts.ExpressionStatement;
		const type = typeChecker.getTypeAtLocation(node.expression);

		expect(isThenableType(typeChecker, node, type)).toBe(expected);
	});
});
