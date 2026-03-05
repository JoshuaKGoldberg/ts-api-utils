// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";
import { describe, expect, it } from "vitest";

import {
	isCompilerOptionEnabled,
	isStrictCompilerOptionEnabled,
} from "./compilerOptions";

describe("isCompilerOptionEnabled", () => {
	it("checks if option is enabled", () => {
		expect(isCompilerOptionEnabled({}, "allowJs")).toBe(false);
		expect(isCompilerOptionEnabled({ allowJs: undefined }, "allowJs")).toBe(
			false,
		);
		expect(isCompilerOptionEnabled({ allowJs: false }, "allowJs")).toBe(false);
		expect(isCompilerOptionEnabled({ allowJs: true }, "allowJs")).toBe(true);
	});

	it("knows composite enables declaration", () => {
		expect(isCompilerOptionEnabled({}, "declaration")).toBe(false);
		expect(isCompilerOptionEnabled({ declaration: false }, "declaration")).toBe(
			false,
		);
		expect(
			isCompilerOptionEnabled({ declaration: undefined }, "declaration"),
		).toBe(false);
		expect(isCompilerOptionEnabled({ declaration: true }, "declaration")).toBe(
			true,
		);

		expect(isCompilerOptionEnabled({ composite: false }, "declaration")).toBe(
			false,
		);
		expect(
			isCompilerOptionEnabled({ composite: undefined }, "declaration"),
		).toBe(false);
		expect(isCompilerOptionEnabled({ composite: true }, "declaration")).toBe(
			true,
		);
		expect(
			isCompilerOptionEnabled(
				{ composite: true, declaration: undefined },
				"declaration",
			),
		).toBe(true);
	});

	it("knows composite implicitly enables incremental", () => {
		expect(isCompilerOptionEnabled({}, "incremental")).toBe(false);
		expect(isCompilerOptionEnabled({ incremental: false }, "incremental")).toBe(
			false,
		);
		expect(
			isCompilerOptionEnabled({ incremental: undefined }, "incremental"),
		).toBe(false);
		expect(isCompilerOptionEnabled({ incremental: true }, "incremental")).toBe(
			true,
		);

		expect(isCompilerOptionEnabled({ composite: false }, "incremental")).toBe(
			false,
		);
		expect(
			isCompilerOptionEnabled({ composite: undefined }, "incremental"),
		).toBe(false);
		expect(isCompilerOptionEnabled({ composite: true }, "incremental")).toBe(
			true,
		);
		expect(
			isCompilerOptionEnabled(
				{ composite: true, incremental: undefined },
				"incremental",
			),
		).toBe(true);
		expect(
			isCompilerOptionEnabled(
				{ composite: true, incremental: false },
				"incremental",
			),
		).toBe(false);
	});

	it("knows stripInternal can only be used with declaration", () => {
		expect(
			isCompilerOptionEnabled({ declaration: true }, "stripInternal"),
		).toBe(false);
		expect(
			isCompilerOptionEnabled({ stripInternal: false }, "stripInternal"),
		).toBe(false);
		expect(
			isCompilerOptionEnabled({ stripInternal: true }, "stripInternal"),
		).toBe(false);
		expect(
			isCompilerOptionEnabled(
				{ declaration: false, stripInternal: true },
				"stripInternal",
			),
		).toBe(false);
		expect(
			isCompilerOptionEnabled(
				{ declaration: true, stripInternal: true },
				"stripInternal",
			),
		).toBe(true);
		expect(
			isCompilerOptionEnabled(
				{ composite: true, stripInternal: true },
				"stripInternal",
			),
		).toBe(true);
		expect(
			isCompilerOptionEnabled(
				{ composite: true, stripInternal: undefined },
				"stripInternal",
			),
		).toBe(false);
	});

	it("knows suppressImplicitAnyIndexErrors can only be used with noImplicitAny", () => {
		expect(
			isCompilerOptionEnabled(
				{ noImplicitAny: true },
				"suppressImplicitAnyIndexErrors",
			),
		).toBe(false);
		expect(
			isCompilerOptionEnabled(
				{ suppressImplicitAnyIndexErrors: false },
				"suppressImplicitAnyIndexErrors",
			),
		).toBe(false);
		expect(
			isCompilerOptionEnabled(
				{ suppressImplicitAnyIndexErrors: true },
				"suppressImplicitAnyIndexErrors",
			),
		).toBe(false);
		expect(
			isCompilerOptionEnabled(
				{ noImplicitAny: false, suppressImplicitAnyIndexErrors: true },
				"suppressImplicitAnyIndexErrors",
			),
		).toBe(false);
		expect(
			isCompilerOptionEnabled(
				{ noImplicitAny: true, suppressImplicitAnyIndexErrors: true },
				"suppressImplicitAnyIndexErrors",
			),
		).toBe(true);
		expect(
			isCompilerOptionEnabled(
				{ strict: true, suppressImplicitAnyIndexErrors: true },
				"suppressImplicitAnyIndexErrors",
			),
		).toBe(true);
		expect(
			isCompilerOptionEnabled(
				{ strict: true, suppressImplicitAnyIndexErrors: undefined },
				"suppressImplicitAnyIndexErrors",
			),
		).toBe(false);
	});

	it("knows skipLibCheck enables skipDefaultLibCheck", () => {
		expect(isCompilerOptionEnabled({}, "skipDefaultLibCheck")).toBe(false);
		expect(
			isCompilerOptionEnabled(
				{ skipDefaultLibCheck: false },
				"skipDefaultLibCheck",
			),
		).toBe(false);
		expect(
			isCompilerOptionEnabled(
				{ skipDefaultLibCheck: undefined },
				"skipDefaultLibCheck",
			),
		).toBe(false);
		expect(
			isCompilerOptionEnabled(
				{ skipDefaultLibCheck: true },
				"skipDefaultLibCheck",
			),
		).toBe(true);

		expect(
			isCompilerOptionEnabled({ skipLibCheck: false }, "skipDefaultLibCheck"),
		).toBe(false);
		expect(
			isCompilerOptionEnabled(
				{ skipLibCheck: undefined },
				"skipDefaultLibCheck",
			),
		).toBe(false);
		expect(
			isCompilerOptionEnabled({ skipLibCheck: true }, "skipDefaultLibCheck"),
		).toBe(true);
		expect(
			isCompilerOptionEnabled(
				{ skipDefaultLibCheck: undefined, skipLibCheck: true },
				"skipDefaultLibCheck",
			),
		).toBe(true);
	});

	it("delegates strict flags to isStrictCompilerOptionEnabled", () => {
		expect(isCompilerOptionEnabled({ strict: true }, "strictNullChecks")).toBe(
			true,
		);
		expect(
			isCompilerOptionEnabled({ strictNullChecks: true }, "strictNullChecks"),
		).toBe(true);
		expect(
			isCompilerOptionEnabled(
				{ strict: false, strictNullChecks: true },
				"strictNullChecks",
			),
		).toBe(true);
		expect(isCompilerOptionEnabled({ strict: false }, "strictNullChecks")).toBe(
			false,
		);
		expect(
			isCompilerOptionEnabled(
				{ strict: true, strictNullChecks: false },
				"strictNullChecks",
			),
		).toBe(false);
		expect(
			isCompilerOptionEnabled(
				{ strict: false, strictNullChecks: false },
				"strictNullChecks",
			),
		).toBe(false);

		expect(
			isCompilerOptionEnabled(
				{ alwaysStrict: true, strict: false, strictNullChecks: false },
				"alwaysStrict",
			),
		).toBe(true);

		expect(
			isCompilerOptionEnabled({ strict: true }, "strictBindCallApply"),
		).toBe(true);
		expect(
			isStrictCompilerOptionEnabled(
				{ strict: false, strictBindCallApply: true },
				"strictBindCallApply",
			),
		).toBe(true);
		expect(
			isStrictCompilerOptionEnabled(
				{ strict: true, strictBindCallApply: false },
				"strictBindCallApply",
			),
		).toBe(false);
	});

	it("correctly determines allowSyntheticDefaultImports", () => {
		expect(isCompilerOptionEnabled({}, "allowSyntheticDefaultImports")).toBe(
			false,
		);
		expect(
			isCompilerOptionEnabled(
				{ allowSyntheticDefaultImports: false, esModuleInterop: true },
				"allowSyntheticDefaultImports",
			),
		).toBe(false);
		expect(
			isCompilerOptionEnabled(
				{ allowSyntheticDefaultImports: true, esModuleInterop: false },
				"allowSyntheticDefaultImports",
			),
		).toBe(true);
		expect(
			isCompilerOptionEnabled(
				{ allowSyntheticDefaultImports: true },
				"allowSyntheticDefaultImports",
			),
		).toBe(true);
		expect(
			isCompilerOptionEnabled(
				{ esModuleInterop: true },
				"allowSyntheticDefaultImports",
			),
		).toBe(true);
		expect(
			isCompilerOptionEnabled(
				{ esModuleInterop: false },
				"allowSyntheticDefaultImports",
			),
		).toBe(false);
		expect(
			isCompilerOptionEnabled(
				{ esModuleInterop: false, module: ts.ModuleKind.System },
				"allowSyntheticDefaultImports",
			),
		).toBe(true);
		expect(
			isCompilerOptionEnabled(
				{ module: ts.ModuleKind.System },
				"allowSyntheticDefaultImports",
			),
		).toBe(true);
		expect(
			isCompilerOptionEnabled(
				{ esModuleInterop: false, module: ts.ModuleKind.ES2015 },
				"allowSyntheticDefaultImports",
			),
		).toBe(false);
	});
});

describe("isStrictCompilerOptionEnabled", () => {
	it("correctly detects strict flags", () => {
		expect(
			isStrictCompilerOptionEnabled({ strict: true }, "strictNullChecks"),
		).toBe(true);
		expect(
			isStrictCompilerOptionEnabled(
				{ strictNullChecks: true },
				"strictNullChecks",
			),
		).toBe(true);
		expect(
			isStrictCompilerOptionEnabled(
				{ strict: false, strictNullChecks: true },
				"strictNullChecks",
			),
		).toBe(true);
		expect(
			isStrictCompilerOptionEnabled({ strict: false }, "strictNullChecks"),
		).toBe(false);
		expect(
			isStrictCompilerOptionEnabled(
				{ strict: true, strictNullChecks: false },
				"strictNullChecks",
			),
		).toBe(false);
		expect(
			isStrictCompilerOptionEnabled(
				{ strict: false, strictNullChecks: false },
				"strictNullChecks",
			),
		).toBe(false);

		expect(
			isStrictCompilerOptionEnabled(
				{ alwaysStrict: true, strict: false, strictNullChecks: false },
				"alwaysStrict",
			),
		).toBe(true);
	});

	it("knows about strictPropertyInitializations dependency on strictNullChecks", () => {
		expect(
			isStrictCompilerOptionEnabled(
				{ strict: true },
				"strictPropertyInitialization",
			),
		).toBe(true);
		expect(
			isStrictCompilerOptionEnabled(
				{
					strict: false,
					strictNullChecks: true,
					strictPropertyInitialization: true,
				},
				"strictPropertyInitialization",
			),
		).toBe(true);
		expect(
			isStrictCompilerOptionEnabled(
				{ strict: true, strictPropertyInitialization: true },
				"strictPropertyInitialization",
			),
		).toBe(true);
		expect(
			isStrictCompilerOptionEnabled(
				{ strictPropertyInitialization: true },
				"strictPropertyInitialization",
			),
		).toBe(false);
		expect(
			isStrictCompilerOptionEnabled(
				{ strictNullChecks: true },
				"strictPropertyInitialization",
			),
		).toBe(false);
		expect(
			isStrictCompilerOptionEnabled(
				{ strict: false, strictPropertyInitialization: true },
				"strictPropertyInitialization",
			),
		).toBe(false);
		expect(
			isStrictCompilerOptionEnabled(
				{ strict: false, strictNullChecks: true },
				"strictPropertyInitialization",
			),
		).toBe(false);
		expect(
			isStrictCompilerOptionEnabled(
				{ strict: false },
				"strictPropertyInitialization",
			),
		).toBe(false);
		expect(
			isStrictCompilerOptionEnabled(
				{ strict: true, strictPropertyInitialization: false },
				"strictPropertyInitialization",
			),
		).toBe(false);
		expect(
			isStrictCompilerOptionEnabled(
				{ strict: false, strictPropertyInitialization: false },
				"strictPropertyInitialization",
			),
		).toBe(false);
		expect(
			isStrictCompilerOptionEnabled(
				{ strict: true, strictNullChecks: false },
				"strictPropertyInitialization",
			),
		).toBe(false);
	});
});
