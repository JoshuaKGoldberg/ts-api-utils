import ts from "typescript";
import { describe, expect, it } from "vitest";

import { createSourceFileAndTypeChecker } from "../../test/utils.js";
import {
	isIntrinsicAnyType,
	isIntrinsicBigIntType,
	isIntrinsicBooleanType,
	isIntrinsicESSymbolType,
	isIntrinsicNeverType,
	isIntrinsicNullType,
	isIntrinsicNumberType,
	isIntrinsicStringType,
	isIntrinsicType,
	isIntrinsicUndefinedType,
	isIntrinsicUnknownType,
	isIntrinsicVoidType,
} from "./intrinsic.js";

describe.each([
	["isIntrinsicAnyType", isIntrinsicAnyType, "unknown", "any"],
	["isIntrinsicBooleanType", isIntrinsicBooleanType, "unknown", "boolean"],
	["isIntrinsicBigIntType", isIntrinsicBigIntType, "number", "bigint"],
	["isIntrinsicESSymbolType", isIntrinsicESSymbolType, "{}", "symbol"],
	["isIntrinsicType", isIntrinsicType, "[]", "unknown"],
	["isIntrinsicNeverType", isIntrinsicNeverType, "unknown", "never"],
	["isIntrinsicNullType", isIntrinsicNullType, "unknown", "null"],
	["isIntrinsicNumberType", isIntrinsicNumberType, "unknown", "number"],
	["isIntrinsicStringType", isIntrinsicStringType, "unknown", "string"],
	[
		"isIntrinsicUndefinedType",
		isIntrinsicUndefinedType,
		"unknown",
		"undefined",
	],
	["isIntrinsicUnknownType", isIntrinsicUnknownType, "any", "unknown"],
	["isIntrinsicVoidType", isIntrinsicVoidType, "unknown", "void"],
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
