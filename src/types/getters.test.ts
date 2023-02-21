import * as ts from "typescript";
import { describe, expect, it } from "vitest";

import { createSourceFileAndTypeChecker } from "../test/utils.js";
import { getWellKnownSymbolPropertyOfType } from "./getters.js";

describe("getWellKnownSymbolPropertyOfType", () => {
	// https://github.com/JoshuaKGoldberg/ts-api-tools/issues/15
	it("gets the property when it does not have a value declaration", () => {
		const { sourceFile, typeChecker } = createSourceFileAndTypeChecker(`
            declare const x: {
                [Symbol.asyncIterator](): AsyncIterator<any>;
            }
        `);

		const node = (sourceFile.statements[0] as ts.VariableStatement)
			.declarationList.declarations[0].name;

		const type = typeChecker.getTypeAtLocation(node);

		expect(
			getWellKnownSymbolPropertyOfType(type, "asyncIterator", typeChecker)
		).toMatchObject({
			name: /^__@asyncIterator/,
		});
	});
});
