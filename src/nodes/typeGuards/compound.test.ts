import ts from "typescript";
import { describe, expect, it } from "vitest";

import { createNode } from "../../test/utils.js";
import {
	isConstAssertionExpression,
	isNumericOrStringLikeLiteral,
} from "./compound.js";

describe("isNumericOrStringLikeLiteral", () => {
	it.each([
		[false, "an identifier", ts.factory.createIdentifier("abc")],
		[
			true,
			"a no substitution template literal",
			ts.factory.createNoSubstitutionTemplateLiteral("abc"),
		],
		[true, "a numeric literal", ts.factory.createNumericLiteral("123")],
		[true, "a string literal", ts.factory.createStringLiteral("abc")],
	])("returns %j when given %s", (expected, _, node) => {
		expect(isNumericOrStringLikeLiteral(node)).toBe(expected);
	});
});

describe("isConstAssertionExpression", () => {
	it.each([
		[
			false,
			"an assertion expression with a literal type reference node",
			ts.factory.createTypeAssertion(
				ts.factory.createLiteralTypeNode(ts.factory.createNull()),
				ts.factory.createIdentifier("def")
			),
		],
		[
			false,
			"an assertion expression with a type reference node with a qualifier typeName identifier",
			ts.factory.createTypeAssertion(
				ts.factory.createTypeReferenceNode(
					ts.factory.createQualifiedName(
						ts.factory.createIdentifier("abc"),
						"def"
					)
				),
				ts.factory.createIdentifier("ghi")
			),
		],
		[
			false,
			"an assertion expression with a type reference node with a non-const identifier typeName",
			ts.factory.createTypeAssertion(
				ts.factory.createTypeReferenceNode("abc"),
				ts.factory.createIdentifier("def")
			),
		],
		[
			true,
			"an assertion expression with a type reference node with a const identifier typeName",
			ts.factory.createTypeAssertion(
				ts.factory.createTypeReferenceNode("const"),
				ts.factory.createIdentifier("abc")
			),
		],
	])("returns %j when given %s", (expected, _, node) => {
		expect(isConstAssertionExpression(createNode(node))).toBe(expected);
	});
});
