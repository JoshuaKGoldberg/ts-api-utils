import * as ts from "typescript";
import { describe, expect, it } from "vitest";

import { createNode } from "../test/utils";
import {
	isAccessorDeclaration,
	isArrayBindingPattern,
	isArrayLiteralExpression,
	isArrayTypeNode,
	isArrowFunction,
	isAsExpression,
	isAssertionExpression,
	isAwaitExpression,
	isBinaryExpression,
	isBindingElement,
	isBindingPattern,
	isBlock,
	isBlockLike,
	isBooleanLiteral,
	isBreakStatement,
	isConstAssertionExpression,
	isContinueStatement,
	isEntityNameExpression,
	isExpression,
	isNumericOrStringLikeLiteral,
	isObjectBindingPattern,
	isParameterDeclaration,
	isTupleTypeNode,
	isTypeAssertion,
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

describe("isArrowFunction", () => {
	it.each([
		[true, "an arrow function", "() => {}"],
		[false, "a function expression", "const foo = function() {}"],
		[false, "a function declaration", "function foo() {}"],
	])("returns %j when given %s", (expected, _, node) => {
		expect(isArrowFunction(createNode(node))).toBe(expected);
	});
});

describe("isAsExpression", () => {
	it.each([
		[
			true,
			"an as const expression",
			createNode("const foo = 1 as const") as ts.VariableDeclaration,
		],
		[
			true,
			"an as X expression",
			createNode("const foo = 1 as unknown") as ts.VariableDeclaration,
		],
		[
			false,
			"a type assertion expression",
			createNode("const foo = <unknown>1") as ts.VariableDeclaration,
		],
	])("returns %j when given %s", (expected, _, node) => {
		expect(isAsExpression(node.initializer!)).toBe(expected);
	});
});

describe("isAssertionExpression", () => {
	it.each([
		[
			true,
			"an as const expression",
			createNode("const foo = 1 as const") as ts.VariableDeclaration,
		],
		[
			true,
			"an as X expression",
			createNode("const foo = 1 as unknown") as ts.VariableDeclaration,
		],
		[
			true,
			"a type assertion expression",
			createNode("const foo = <unknown>1") as ts.VariableDeclaration,
		],
	])("returns %j when given %s", (expected, _, node) => {
		expect(isAssertionExpression(node.initializer!)).toBe(expected);
	});
});

describe("isAwaitExpression", () => {
	it.each([
		[
			true,
			"an await expression",
			createNode("const foo = await 1") as ts.VariableDeclaration,
		],
		[
			false,
			"an non-await expression",
			createNode("const foo = 1") as ts.VariableDeclaration,
		],
	])("returns %j when given %s", (expected, _, node) => {
		expect(isAwaitExpression(node.initializer!)).toBe(expected);
	});
});

describe("isBinaryExpression", () => {
	it.each([
		[true, "a = assignment", "a = b"],
		[true, "a += assignment", "a += b"],
		[true, "a == comparison", "a == b"],
		[true, "a > comparison", "a > b"],
		[false, "an identifier", "a"],
	])("returns %j when given %s", (expected, _, node) => {
		expect(isBinaryExpression(createNode(node))).toBe(expected);
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

describe("isBlock", () => {
	it.each([
		[true, "a lone block", createNode("{ foo() }")],
		[
			true,
			"an if statement's block",
			(createNode("if(true) { foo() }") as ts.IfStatement).thenStatement,
		],
		[
			true,
			"a while loop's block",
			(createNode("while(true) { foo() }") as ts.WhileStatement).statement,
		],
		[
			false,
			"an if statement's non-block statement",
			(createNode("if(true) foo()") as ts.IfStatement).thenStatement,
		],
		[
			false,
			"a while loop's non-block statement",
			(createNode("while(true) foo()") as ts.WhileStatement).statement,
		],
	])("returns %j when given %s", (expected, _, node) => {
		expect(isBlock(node)).toBe(expected);
	});
});

describe("isBlockLike", () => {
	it.each([
		[true, "an actual block", createNode("{ foo() }")],
		// TODO: Test SourceFile
		// TODO: Test ModuleBlock
		// TODO: Test CaseClause
		// TODO: Test DefaultClause
	])("returns %j when given %s", (expected, _, node) => {
		expect(isBlockLike(node)).toBe(expected);
	});
});

describe("isBooleanLiteral", () => {
	it.each([
		[true, "true", "true"],
		[true, "false", "false"],
		[false, "true expression", "1 === 1"],
	])("returns %j when given %s", (expected, _, node) => {
		expect(isBooleanLiteral(createNode(node))).toBe(expected);
	});
});

describe("isBreakStatement", () => {
	it.each([
		[true, "break", "break"],
		[false, "continue", "continue"],
	])("returns %j when given %s", (expected, _, node) => {
		expect(isBreakStatement(createNode(node))).toBe(expected);
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

describe("isContinueStatement", () => {
	it.each([
		[false, "break", "break"],
		[true, "continue", "continue"],
	])("returns %j when given %s", (expected, _, node) => {
		expect(isContinueStatement(createNode(node))).toBe(expected);
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

describe("isTypeAssertion", () => {
	it.each([
		[
			false,
			"an as const expression",
			createNode("const foo = 1 as const") as ts.VariableDeclaration,
		],
		[
			false,
			"an as X expression",
			createNode("const foo = 1 as unknown") as ts.VariableDeclaration,
		],
		[
			true,
			"a type assertion expression",
			createNode("const foo = <unknown>1") as ts.VariableDeclaration,
		],
	])("returns %j when given %s", (expected, _, node) => {
		expect(isTypeAssertion(node.initializer!)).toBe(expected);
	});
});
