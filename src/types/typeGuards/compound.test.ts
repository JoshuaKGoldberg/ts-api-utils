import ts from "typescript";
import { describe, expect, it } from "vitest";

import { createSourceFileAndTypeChecker } from "../../test/utils";
import { isTupleTypeReference } from "./compound";

function getTypeForTypeNode(sourceText: string) {
	const { sourceFile, typeChecker } =
		createSourceFileAndTypeChecker(sourceText);
	const node = sourceFile.statements.at(-1) as ts.TypeAliasDeclaration;

	return typeChecker.getTypeAtLocation(node);
}

describe("isTupleTypeReference", () => {
	it.each([
		[false, "type Test = string[];"],
		[false, "type Test = 1[];"],
		[true, `type Data = []; type Test = [Data];`],
	])("returns %j when given %s", (expected, sourceText) => {
		const type = getTypeForTypeNode(sourceText);

		expect(isTupleTypeReference(type)).toBe(expected);
	});
});
