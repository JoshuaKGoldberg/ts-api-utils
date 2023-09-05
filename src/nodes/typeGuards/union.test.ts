import ts from "typescript";
import { describe, expect, it } from "vitest";

import { createNode } from "../../test/utils.js";
import { isTsVersionAtLeast } from "../../utils.js";
import {
	isAccessExpression,
	isAccessibilityModifier,
	isAccessorDeclaration,
	isArrayBindingElement,
	isArrayBindingOrAssignmentPattern,
	isAssignmentPattern,
	isBooleanLiteral,
	isClassMemberModifier,
	isEntityNameExpression,
} from "./union.js";

describe("isAccessExpression", () => {
	it.each([
		[false, `abc`],
		[false, `abc.def()`],
		[true, `abc.def`],
		[true, `element['property'];`],
	])("returns %j when given %s", (expected, sourceText) => {
		expect(isAccessExpression(createNode(sourceText))).toBe(expected);
	});
});

describe("isAccessibilityModifier", () => {
	it.each([
		[false, `abc`],
		[true, ts.factory.createModifier(ts.SyntaxKind.PrivateKeyword)],
		[true, ts.factory.createModifier(ts.SyntaxKind.ProtectedKeyword)],
		[true, ts.factory.createModifier(ts.SyntaxKind.PublicKeyword)],
	])("returns %j when given %s", (expected, sourceText) => {
		expect(isAccessibilityModifier(createNode(sourceText))).toBe(expected);
	});
});

if (isTsVersionAtLeast(4, 9)) {
	describe("isAccessorDeclaration", () => {
		it.each([
			[false, `abc`],
			[
				true,
				ts.factory.createGetAccessorDeclaration(
					undefined,
					"property",
					[],
					undefined,
					undefined,
				),
			],
			[
				true,
				ts.factory.createSetAccessorDeclaration(
					undefined,
					"property",
					[],
					undefined,
				),
			],
		])("returns %j when given %s", (expected, sourceText) => {
			// eslint-disable-next-line deprecation/deprecation
			expect(isAccessorDeclaration(createNode(sourceText))).toBe(expected);
		});
	});
}

describe("isArrayBindingOrAssignmentPattern", () => {
	it.each([
		[false, `"[a]"`],
		[false, `"[a] = b"`],
		[true, ts.factory.createArrayBindingPattern([])],
		[true, ts.factory.createArrayLiteralExpression()],
	])("returns %j when given %s", (expected, sourceText) => {
		expect(isArrayBindingOrAssignmentPattern(createNode(sourceText))).toBe(
			expected,
		);
	});
});

describe("isArrayBindingElement", () => {
	it.each([
		[false, `abc`],
		[true, ts.factory.createBindingElement(undefined, "property", "name")],
		[true, ts.factory.createOmittedExpression()],
	])("returns %j when given %s", (expected, sourceText) => {
		// eslint-disable-next-line deprecation/deprecation
		expect(isArrayBindingElement(createNode(sourceText))).toBe(expected);
	});
});

describe("isAssignmentPattern", () => {
	it.each([
		[false, `"[a]"`],
		[false, `"{a}"`],
		[false, `"[a] = b"`],
		[false, `"{a} = b"`],
		[true, ts.factory.createObjectLiteralExpression()],
		[true, ts.factory.createArrayLiteralExpression()],
	])("returns %j when given %s", (expected, sourceText) => {
		expect(isAssignmentPattern(createNode(sourceText))).toBe(expected);
	});
});

describe("isBooleanLiteral", () => {
	it.each([
		[false, `boolean`],
		[true, "false"],
		[true, "true"],
	])("returns %j when given %s", (expected, sourceText) => {
		expect(isBooleanLiteral(createNode(sourceText))).toBe(expected);
	});
});

describe("isClassMemberModifier", () => {
	it.each([
		[false, `boolean`],
		[false, ts.factory.createModifier(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createModifier(ts.SyntaxKind.PrivateKeyword)],
		[true, ts.factory.createModifier(ts.SyntaxKind.ReadonlyKeyword)],
		[true, ts.factory.createModifier(ts.SyntaxKind.ReadonlyKeyword)],
	])("returns %j when given %s", (expected, sourceText) => {
		expect(isClassMemberModifier(createNode(sourceText))).toBe(expected);
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
