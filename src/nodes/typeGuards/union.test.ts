import { describe, expect, it } from "vitest";

import { createNode } from "../../test/utils";
import { isEntityNameExpression } from "./union";

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
