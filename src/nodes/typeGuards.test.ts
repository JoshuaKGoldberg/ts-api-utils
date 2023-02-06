import * as ts from "typescript";
import { describe, expect, it } from "vitest";

import { createNode } from "../test/utils";
import {
	isAccessorDeclaration,
	isConstAssertionExpression,
	isEntityNameExpression,
	isExpression,
	isNumericOrStringLikeLiteral,
	isParameterDeclaration,
} from "./typeGuards";

describe("isAccessorDeclaration", () => {
	it.each([
		[
			true,
			"a setter on an object",
			(
				(
					createNode(
						"type T = { set abc(value: unknown) { } }"
					) as ts.TypeAliasDeclaration
				).type as ts.TypeLiteralNode
			).members[0],
		],
		[
			true,
			"a getter on an object",
			(
				(
					createNode(
						"type T = { get abc() { return 1 } }"
					) as ts.TypeAliasDeclaration
				).type as ts.TypeLiteralNode
			).members[0],
		],
	])("returns %j when given %s", (expected, _, node) => {
		expect(isAccessorDeclaration(node)).toBe(expected);
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

describe("isEntityNameExpression", () => {
	it.each([
		[false, `"abc"`],
		[false, `abc().def`],
		[true, "abc"],
		[true, `abc.def`],
	])("returns %j when given %s", (expected, sourceText) => {
		expect(isEntityNameExpression(createNode(sourceText))).toBe(expected);
	});
});

describe("isExpression", () => {
	it.each([
		[false, `type T = null`],
		[true, `abc`],
		[true, `"abc"`],
	])("returns %j when given %s", (expected, sourceText) => {
		expect(isExpression(createNode(sourceText))).toBe(expected);
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
		expect(isParameterDeclaration(createNode(node))).toBe(expected);
	});
});
