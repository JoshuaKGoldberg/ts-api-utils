import ts from "typescript";
import { describe, expect, test } from "vitest";

import { createSourceFile } from "../test/utils";
import { collectVariableUsage } from "./collectVariableUsage";
import { DeclarationDomain } from "./declarations";
import { UsageDomain } from "./getUsageDomain";

describe("collectVariableUsage", () => {
	test("variable reference", () => {
		const sourceFile = createSourceFile(`
			let value = 123;
			value;
		`);

		const nodeIdentifierInitializer = (
			sourceFile.statements[0] as ts.VariableStatement
		).declarationList.declarations[0].name as ts.Identifier;

		const nodeIdentifierReference = (
			sourceFile.statements[1] as ts.ExpressionStatement
		).expression as ts.Identifier;

		const actual = collectVariableUsage(sourceFile);

		expect(actual).toEqual(
			new Map([
				[
					nodeIdentifierInitializer,
					{
						declarations: [nodeIdentifierInitializer],
						domain: DeclarationDomain.Value,
						exported: false,
						inGlobalScope: true,
						uses: [
							{
								domain: UsageDomain.ValueOrNamespace,
								location: nodeIdentifierReference,
							},
						],
					},
				],
			]),
		);
	});
});
