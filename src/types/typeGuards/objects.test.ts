import { describe, expect, it } from "vitest";

import { createSourceFileAndTypeChecker } from "../../test/utils.js";
import { isIntrinsicType } from "./intrinsic.js";
import { isTupleType, isTypeReference } from "./objects.js";

function getTypeForTypeNode(sourceText: string) {
	const { sourceFile, typeChecker } =
		createSourceFileAndTypeChecker(sourceText);
	const node = sourceFile.statements.at(-1)!;

	const type = typeChecker.getTypeAtLocation(node);
	if (isIntrinsicType(type) && type.intrinsicName === "error") {
		throw new Error("test case error");
	}

	return type;
}

describe("isTupleType", () => {
	it.each([
		[false, "type Test = {};"],
		[false, "type Test = string[];"],
		[true, "type Test = [1, 2, 3];"],
		[true, "type Test = [];"],
	])("returns %j when given %s", (expected, sourceText) => {
		const type = getTypeForTypeNode(sourceText);

		if (isTypeReference(type)) {
			expect(isTupleType(type.target)).toBe(expected);
		} else {
			expect(isTupleType(type)).toBe(expected);
		}
	});
});

describe("isTypeReference", () => {
	it.each([
		[false, "type Test = string;"],
		[false, "type Test = 1;"],
		[true, `type Data = []; type Test = Data;`],
	])("returns %j when given %s", (expected, sourceText) => {
		const type = getTypeForTypeNode(sourceText);

		expect(isTypeReference(type)).toBe(expected);
	});
});
