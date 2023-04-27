import ts from "typescript";
import { describe, expect, it } from "vitest";

import { createSourceFileAndTypeChecker } from "../test/utils";
import {
	isFalsyType,
	isPropertyReadonlyInType,
	isThenableType,
	symbolHasReadonlyDeclaration,
} from "./utilities";

describe("isPropertyReadonlyInType", () => {
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
				typeChecker
			)
		).toBe(false);
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

describe("symbolHasReadonlyDeclaration", () => {
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
	])("returns %j when given %s", (expected, source) => {
		const { sourceFile, typeChecker } = createSourceFileAndTypeChecker(source);
		const node = sourceFile.statements.at(-1) as ts.ExpressionStatement;
		const type = typeChecker.getTypeAtLocation(node.expression);
		const symbol = type.getSymbol()!;

		expect(symbolHasReadonlyDeclaration(symbol, typeChecker)).toBe(expected);
	});
});
