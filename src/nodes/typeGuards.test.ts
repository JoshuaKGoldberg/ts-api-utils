import * as ts from "typescript";
import { describe, expect, it } from "vitest";

import { createNode } from "../test/utils";
import {
	isAccessorDeclaration,
	isArrayBindingPattern,
	isArrayLiteralExpression,
	isArrayTypeNode,
	isBindingElement,
	isBindingPattern,
	isConstAssertionExpression,
	isEntityNameExpression,
	isExpression,
	isNumericOrStringLikeLiteral,
	isObjectBindingPattern,
	isParameterDeclaration,
	isTupleTypeNode,
} from "./typeGuards";

describe("isAccessorDeclaration", () => {
	it.each([
		[
			true,
			"a setter on an object",
			(
				createNode(
					"type T = { set abc(value: unknown) { } }"
				) as ts.TypeLiteralNode
			).members[0],
		],
		[
			true,
			"a getter on an object",
			(createNode("type T = { get abc() { return 1 } }") as ts.TypeLiteralNode)
				.members[0],
		],
	])("returns %j when given %s", (expected, _, node) => {
		expect(isAccessorDeclaration(node)).toBe(expected);
	});
});

describe("isArrayTypeNode", () => {
	const arrayTypeLiteral = createNode(
		"type T = string[]"
	) as ts.TypeLiteralNode;

	const tupleTypeLiteral = createNode(
		"type T = [string]"
	) as ts.TypeLiteralNode;

	it.each([
		[true, "an array type literal", arrayTypeLiteral],
		[false, "an tuple type literal", tupleTypeLiteral],
	])("returns %j when given %s", (expected, _, node) => {
		expect(isArrayTypeNode(node)).toBe(expected);
	});
});

describe("isArrayBindingPattern", () => {
	const arrayDestructuring = createNode(
		"const [a, , [c], ...rest] = [1, 2, [3], 4, 5]"
	) as ts.VariableDeclaration;

	const objectDestructuring = createNode(
		"const { a, ...rest } = { a: 1, b: 2, c: 3 }"
	) as ts.VariableDeclaration;

	it.each([
		[true, "an array destructuring assignment", arrayDestructuring.name],
		[false, "an object destructuring assignment", objectDestructuring.name],
	])("returns %j when given %s", (expected, _, node) => {
		expect(isArrayBindingPattern(node)).toBe(expected);
	});
});

describe("isArrayLiteralExpression", () => {
	it.each([
		[true, "an array literal", "[1, 2, 3]"],
		[false, "an object literal", "{ a: 1 }"],
	])("returns %j when given %s", (expected, _, node) => {
		expect(isArrayLiteralExpression(createNode(node))).toBe(expected);
	});
});

describe("isBindingElement", () => {
	const arrayDestructuringElements = (
		(
			createNode(
				"const [a, , [c], ...rest] = [1, 2, [3], 4, 5]"
			) as ts.VariableDeclaration
		).name as ts.BindingPattern
	).elements;

	const objectDestructuringElements = (
		(
			createNode(
				"const { a, ...rest } = { a: 1, b: 2, c: 3 }"
			) as ts.VariableDeclaration
		).name as ts.BindingPattern
	).elements;

	it.each([
		[
			true,
			"an identifier in an array destructuring assignment",
			arrayDestructuringElements[0],
		],
		[
			false,
			"an obition of an element in an array destructuring assignment",
			arrayDestructuringElements[1],
		],
		[
			true,
			"an array pattern in an array destructuring assignment",
			arrayDestructuringElements[2],
		],
		[
			true,
			"a rest argument of an array destructuring assignment",
			arrayDestructuringElements[3],
		],
		[
			true,
			"an identifier in an object destructuring assignment",
			objectDestructuringElements[0],
		],
		[
			true,
			"a rest argument of an object destructuring assignment",
			objectDestructuringElements[1],
		],
	])("returns %j when given %s", (expected, _, node) => {
		expect(isBindingElement(node)).toBe(expected);
	});
});

describe("isBindingPattern", () => {
	const arrayDestructuring = createNode(
		"const [a, , [c], ...rest] = [1, 2, [3], 4, 5]"
	) as ts.VariableDeclaration;

	const objectDestructuring = createNode(
		"const { a, ...rest } = { a: 1, b: 2, c: 3 }"
	) as ts.VariableDeclaration;

	it.each([
		[true, "an array destructuring assignment", arrayDestructuring.name],
		[true, "an object destructuring assignment", objectDestructuring.name],
	])("returns %j when given %s", (expected, _, node) => {
		expect(isBindingPattern(node)).toBe(expected);
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

describe("isObjectBindingPattern", () => {
	const arrayDestructuring = createNode(
		"const [a, , [c], ...rest] = [1, 2, [3], 4, 5]"
	) as ts.VariableDeclaration;

	const objectDestructuring = createNode(
		"const { a, ...rest } = { a: 1, b: 2, c: 3 }"
	) as ts.VariableDeclaration;

	it.each([
		[false, "an array destructuring assignment", arrayDestructuring.name],
		[true, "an object destructuring assignment", objectDestructuring.name],
	])("returns %j when given %s", (expected, _, node) => {
		expect(isObjectBindingPattern(node)).toBe(expected);
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

describe("isTupleTypeNode", () => {
	const arrayTypeLiteral = createNode(
		"type T = string[]"
	) as ts.TypeLiteralNode;

	const tupleTypeLiteral = createNode(
		"type T = [string]"
	) as ts.TypeLiteralNode;

	it.each([
		[false, "an array type literal", arrayTypeLiteral],
		[true, "an tuple type literal", tupleTypeLiteral],
	])("returns %j when given %s", (expected, _, node) => {
		expect(isTupleTypeNode(node)).toBe(expected);
	});
});
