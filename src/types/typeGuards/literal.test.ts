import ts from "typescript";
import { describe, expect, it } from "vitest";

import { createSourceFileAndTypeChecker } from "../../test/utils.js";
import {
	isBigIntLiteralType,
	isFalseLiteralType,
	isLiteralType,
	isNumberLiteralType,
	isStringLiteralType,
	isTemplateLiteralType,
	isTrueLiteralType,
} from "./literal.js";

describe.each([
	["isBigIntLiteralType", isBigIntLiteralType, "0", "0n"],
	["isLiteralType", isLiteralType, "number", "0"],
	["isNumberLiteralType", isNumberLiteralType, "number", "0"],
	["isStringLiteralType", isStringLiteralType, "string", "''"],
	["isTemplateLiteralType", isTemplateLiteralType, "''", "`abc${string}`"],
	["isTrueLiteralType", isTrueLiteralType, "boolean", "true"],
	["isFalseLiteralType", isFalseLiteralType, "boolean", "false"],
])(`%s`, (name, typeGuard, falseCase, trueCase) => {
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
