import * as ts from "typescript";
import { describe, expect, it } from "vitest";

import {
	isConstAssertionExpression,
	isEntityNameExpression,
	isExpression,
	isNumericOrStringLikeLiteral,
	isParameterDeclaration,
} from "./typeGuards";

describe("isEntityNameExpression", () => {
	it.each([
		[false, "a string literal", ts.factory.createStringLiteral("abc")],
		[
			false,
			"a property access expression with an call expression expression",
			ts.factory.createPropertyAccessExpression(
				ts.factory.createCallExpression(
					ts.factory.createIdentifier("abc"),
					undefined /* typeArguments */,
					undefined /* argumentsArray */
				),
				"def"
			),
		],
		[true, "an identifier", ts.factory.createIdentifier("abc")],
		[
			true,
			"a property access expression with an identifier expression",
			ts.factory.createPropertyAccessExpression(
				ts.factory.createIdentifier("abc"),
				"def"
			),
		],
	])("returns %j when given %s", (expected, _, node) => {
		expect(isEntityNameExpression(node)).toBe(expected);
	});
});

describe("isExpression", () => {
	it.each([
		[
			false,
			"a literal type node with null",
			ts.factory.createLiteralTypeNode(ts.factory.createNull()),
		],
		[true, "an identifier", ts.factory.createIdentifier("abc")],
		[true, "a string literal", ts.factory.createStringLiteral("abc")],
	])("returns %j when given %s", (expected, _, node) => {
		expect(isExpression(node)).toBe(expected);
	});
});

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

describe("isParameterDeclaration", () => {
	it.each([
		[false, "an identifier", ts.factory.createIdentifier("abc")],
		[
			true,
			"a parameter declaration",
			ts.factory.createParameterDeclaration(
				undefined /* modifiers */,
				undefined /* dotDotDotToken */,
				"abc"
			),
		],
	])("returns %j when given %s", (expected, _, node) => {
		expect(isParameterDeclaration(node)).toBe(expected);
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
		expect(isConstAssertionExpression(node)).toBe(expected);
	});
});
