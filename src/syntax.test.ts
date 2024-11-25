import * as ts from "typescript";
import { describe, expect, it } from "vitest";

import {
	isAssignmentKind,
	isNumericPropertyName,
	isValidPropertyAccess,
} from "./syntax";
import { isTsVersionAtLeast } from "./utils";

const isTS4dot4 = isTsVersionAtLeast(4, 4);

describe("isAssignmentKind", () => {
	const tests: [boolean, ts.SyntaxKind][] = [
		[true, ts.SyntaxKind.FirstAssignment],
		[true, ts.SyntaxKind.LastAssignment],
		[false, ts.SyntaxKind.Identifier],
	];

	if (isTS4dot4) {
		tests.push([false, ts.SyntaxKind.HashToken]);
	}

	it.each(tests)("returns %j when given %j", (expected, input) => {
		expect(isAssignmentKind(input)).toBe(expected);
	});
});

describe("isNumericPropertyName", () => {
	it.each([
		[false, ""],
		[true, "0"],
		[true, "-1"],
		[false, "abc"],
		[false, "1-1"],
	])("returns %j when given %j", (expected, input) => {
		expect(isNumericPropertyName(input)).toBe(expected);
	});
});

// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

describe("isValidPropertyAccess", () => {
	it.each([
		[false, "\uFEFFtest"],
		[false, "\\uFEFFtest"],
		[false, "\uFEFF1"],
		[false, "\\uFEFF1"],
		[false, "\ntest"],
		[false, "\\ntest"],
		[true, "a"],
		[true, "_a"],
		[false, "a-b"],
		[false, "-1"],
		[false, "1foo"],
		[true, "foo1"],
		[false, "\n"],
		[false, " "],
		[false, "a b"],
		[false, "a,b"],
		[false, "a + b"],
		[false, "1"],
		[false, "1.0"],
		[false, "1.1"],
		[false, "+1"],
		[true, "true"],
		[true, "false"],
		[true, "catch"],
		[true, "try"],
		[false, "1_2_3"],
		[true, "𝑚"],
		[false, "\\u0061"],
	])("returns %j when given %j", (expected, input) => {
		expect(isValidPropertyAccess(input)).toBe(expected);
	});
});
