import { describe, expect, it } from "vitest";

import { createNode } from "../../test/utils";
import { isExpression } from "./internal";

describe("isExpression", () => {
	it.each([
		[false, `type T = null`],
		[true, `abc = 1`],
		[true, `() => "abc"`],
		[true, `abc()`],
	])("returns %j when given %s", (expected, sourceText) => {
		expect(isExpression(createNode(sourceText))).toBe(expected);
	});
});
