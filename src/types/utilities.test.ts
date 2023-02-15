import * as ts from "typescript";
import { describe, expect, it } from "vitest";

import { createSourceFileAndTypeChecker } from "../test/utils.js";
import { isPropertyReadonlyInType } from "./utilities.js";

describe("isPropertyReadonlyInType", () => {
	it("does not crash when the type is a mapped type parameter extending any", () => {
		const { sourceFile, typeChecker } = createSourceFileAndTypeChecker(`
            type MyType<T> = {
                [K in keyof T]: 'cat' | 'dog' | T[K];
            };
            type Test<A extends any[]> = MyType<A>;
        `);
		const node = sourceFile.statements.at(-1) as ts.TypeAliasDeclaration;
		const type = typeChecker.getTypeAtLocation(node);

		expect(
			isPropertyReadonlyInType(
				type,
				ts.escapeLeadingUnderscores("length"),
				typeChecker
			)
		).toBe(false);
	});
});
