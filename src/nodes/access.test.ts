import ts from "typescript";
import { describe, expect, it } from "vitest";

import { createNodeAndSourceFile } from "../test/utils";
import { AccessKind, getAccessKind } from "./access";

describe("getAccessKind", () => {
	it("returns AccessKind.None when the node is not an access", () => {
		const { node } = createNodeAndSourceFile<ts.Expression>("let value;");

		const actual = getAccessKind(node);

		expect(actual).toBe(AccessKind.None);
	});

	it("returns AccessKind.Read when the node is a read", () => {
		const { node } = createNodeAndSourceFile<ts.Expression>("abc.def;");

		const actual = getAccessKind(node);

		expect(actual).toBe(AccessKind.Read);
	});

	it("returns AccessKind.Write when the node is a write", () => {
		const { node } = createNodeAndSourceFile<ts.BinaryExpression>("abc = ghi;");

		const actual = getAccessKind(node.left);

		expect(actual).toBe(AccessKind.Write);
	});

	it("returns AccessKind.Delete when the node is a delete", () => {
		const { node } =
			createNodeAndSourceFile<ts.DeleteExpression>("delete abc.def;");

		const actual = getAccessKind(node.expression);

		expect(actual).toBe(AccessKind.Delete);
	});

	it("returns AccessKind.ReadWrite when the node reads and writes", () => {
		const { node } =
			createNodeAndSourceFile<ts.BinaryExpression>("abc.def += 1;");

		const actual = getAccessKind(node.left);

		expect(actual).toBe(AccessKind.ReadWrite);
	});
});
