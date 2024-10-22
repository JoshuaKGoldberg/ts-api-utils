import ts from "typescript";
import { describe, expect, it } from "vitest";

import { createSourceFileAndTypeChecker } from "../../test/utils";
import {
	BooleanLiteralType,
	isBigIntLiteralType,
	isBooleanLiteralType,
	isFalseLiteralType,
	isLiteralType,
	isNumberLiteralType,
	isStringLiteralType,
	isTemplateLiteralType,
	isTrueLiteralType,
} from "./literal";

describe.each([
	["isBigIntLiteralType", isBigIntLiteralType, "0", "0n"],
	["isLiteralType", isLiteralType, "number", "0"],
	["isNumberLiteralType", isNumberLiteralType, "number", "0"],
	["isStringLiteralType", isStringLiteralType, "string", "''"],
	["isTemplateLiteralType", isTemplateLiteralType, "''", "`abc${string}`"],
	["isTrueLiteralType", isTrueLiteralType, "boolean", "true"],
	["isFalseLiteralType", isFalseLiteralType, "boolean", "false"],
])(`%s`, (name, typeGuard, falseCase, trueCase) => {
	// eslint-disable-next-line vitest/valid-title -- https://github.com/veritem/eslint-plugin-vitest/issues/251
	describe(name, () => {
		it.each([
			[false, falseCase],
			[true, trueCase],
		])('returns %j when given "%s"', (expected, source) => {
			const { sourceFile, typeChecker } = createSourceFileAndTypeChecker(`
				declare const x: ${source};
			`);

			const node = (sourceFile.statements[0] as ts.VariableStatement)
				.declarationList.declarations[0].name;

			const type = typeChecker.getTypeAtLocation(node);

			expect(typeGuard(type)).toEqual(expected);
		});
	});
});

describe("booleans don't have .value", () => {
	for (const trueOrFalse of ["true", "false"]) {
		it(`should show that ${trueOrFalse} is a boolean literal type but doesn't have a .value field`, () => {
			const { sourceFile, typeChecker } = createSourceFileAndTypeChecker(`
			declare const x: ${trueOrFalse};
		`);

			const node = (sourceFile.statements[0] as ts.VariableStatement)
				.declarationList.declarations[0].name;

			const type = typeChecker.getTypeAtLocation(node);

			expect(isBooleanLiteralType(type)).toBe(true);
			const booleanLiteralType = type as BooleanLiteralType;
			expect(booleanLiteralType.intrinsicName).toEqual(trueOrFalse);

			// @ts-expect-error: boolean literals don't have a value
			expect(booleanLiteralType.value).toBeUndefined();
		});
	}
});
