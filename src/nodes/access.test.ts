import ts from "typescript";
import { describe, expect, it } from "vitest";

import { createNode } from "../test/utils";
import { AccessKind, getAccessKind } from "./access";

describe("getAccessKind", () => {
	it("returns AccessKind.None when the node is not an access", () => {
		const node = createNode<ts.Expression>("let value;");

		const actual = getAccessKind(node);

		expect(actual).toBe(AccessKind.None);
	});

	it("returns AccessKind.Read when the node is a property access", () => {
		const node = createNode<ts.Expression>("abc.def;");

		const actual = getAccessKind(node);

		expect(actual).toBe(AccessKind.Read);
	});

	it("returns AccessKind.Read when the node is a shorthand property assignment in a variable", () => {
		const node = createNode<ts.VariableStatement>("const abc = { def };");

		const actual = getAccessKind(
			node.declarationList.declarations[0].initializer!,
		);

		expect(actual).toBe(AccessKind.Read);
	});

	it("returns AccessKind.Read when the node is an array spread element", () => {
		const node = createNode<ts.ArrayLiteralExpression>("[...abc]");

		const actual = getAccessKind(node.elements[0]);

		expect(actual).toBe(AccessKind.Read);
	});

	it("returns AccessKind.Read when the node is a nested array spread element", () => {
		const node = createNode<
			ts.ArrayLiteralExpression & {
				elements: [
					ts.SpreadElement & {
						expression: ts.ArrayLiteralExpression & {
							elements: ts.SpreadElement;
						};
					},
				];
			}
		>("[...[...abc]]");

		const actual = getAccessKind(node.elements[0].expression.elements[0]);

		expect(actual).toBe(AccessKind.Read);
	});

	it("returns AccessKind.Read when the node is an array spread inside a for-of", () => {
		const node = createNode<
			ts.ForOfStatement & { expression: ts.ArrayLiteralExpression }
		>("for (const _ of [...abc]) {}");

		const actual = getAccessKind(node.expression.elements[0]);

		expect(actual).toBe(AccessKind.Read);
	});

	it("returns AccessKind.Read when the node is an array spread inside a binary expression", () => {
		const node = createNode<
			ts.BinaryExpression & { right: ts.ArrayLiteralExpression }
		>("abc = [...def]");

		const actual = getAccessKind(node.right.elements[0]);

		expect(actual).toBe(AccessKind.Read);
	});

	it("returns AccessKind.Read when the node is an array spread inside an array expression", () => {
		const node = createNode<
			ts.BinaryExpression & {
				right: ts.ArrayLiteralExpression & {
					elements: [ts.ArrayLiteralExpression];
				};
			}
		>("abc = [[...def]]");

		const actual = getAccessKind(node.right.elements[0].elements[0]);

		expect(actual).toBe(AccessKind.Read);
	});

	it("returns AccessKind.Write when the node is a binary assignment", () => {
		const node = createNode<ts.BinaryExpression>("abc = ghi;");

		const actual = getAccessKind(node.left);

		expect(actual).toBe(AccessKind.Write);
	});

	it("returns AccessKind.Delete when the node is a delete", () => {
		const node = createNode<ts.DeleteExpression>("delete abc.def;");

		const actual = getAccessKind(node.expression);

		expect(actual).toBe(AccessKind.Delete);
	});

	it("returns AccessKind.ReadWrite when the node is a binary read-write operator", () => {
		const node = createNode<ts.BinaryExpression>("abc.def += 1;");

		const actual = getAccessKind(node.left);

		expect(actual).toBe(AccessKind.ReadWrite);
	});

	it("returns AccessKind.ReadWrite when the node is a postfix unary expression", () => {
		const node = createNode<ts.PostfixUnaryExpression>("abc++;");

		const actual = getAccessKind(node.operand);

		expect(actual).toBe(AccessKind.ReadWrite);
	});

	it("returns AccessKind.ReadWrite when the node is a prefix unary expression", () => {
		const node = createNode<ts.PostfixUnaryExpression>("++abc++");

		const actual = getAccessKind(node.operand);

		expect(actual).toBe(AccessKind.ReadWrite);
	});
});
