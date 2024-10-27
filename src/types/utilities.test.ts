import semver from "semver";
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

	it("returns true when the symbol is a const variable", () => {
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

	if (semver.gte(ts.version, "5.0.0")) {
		it("returns true when the symbol belongs to a property of a nested object literal directly passed into a function that declares the parameter with a const type parameter", () => {
			const { sourceFile, typeChecker } = createSourceFileAndTypeChecker(`
			declare const fn: <const A>(param: A) => unknown;
			
			const bar = { baz: 1 };
			fn({ foo: { bar } });
		`);

			const statement = sourceFile.statements.at(-1) as ts.ExpressionStatement;
			const callExpression = statement.expression as ts.CallExpression;
			const objectLiteral1 = callExpression
				.arguments[0] as ts.ObjectLiteralExpression;
			const foo = objectLiteral1.properties[0] as ts.PropertyAssignment;
			const fooSymbol = (foo as { symbol?: ts.Symbol }).symbol!;
			const objectLiteral2 = foo.initializer as ts.ObjectLiteralExpression;
			const bar = objectLiteral2.properties[0] as ts.PropertyAssignment;
			const barSymbol = (bar as { symbol?: ts.Symbol }).symbol!;
			const barType = typeChecker.getTypeAtLocation(bar);
			const bazSymbol = barType.getProperty("baz")!;

			expect(fooSymbol).toBeDefined();
			expect(barSymbol).toBeDefined();
			expect(bazSymbol).toBeDefined();
			expect(symbolHasReadonlyDeclaration(fooSymbol, typeChecker)).toBe(true);
			expect(symbolHasReadonlyDeclaration(barSymbol, typeChecker)).toBe(true);
			expect(symbolHasReadonlyDeclaration(bazSymbol, typeChecker)).toBe(false);
		});
	}
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
		[true, "0n"],
		[true, "-0n"],
		[false, "24n"],
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
