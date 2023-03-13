// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";

/**
 * An option that can be tested with {@link isCompilerOptionEnabled}.
 *
 * @category Compiler Options
 */
export type BooleanCompilerOptions = keyof {
	[K in keyof ts.CompilerOptions as NonNullable<
		ts.CompilerOptions[K]
	> extends boolean
		? K
		: never]: unknown;
};

/**
 * Checks if a given compiler option is enabled.
 * It handles dependencies of options, e.g. `declaration` is implicitly enabled by `composite` or `strictNullChecks` is enabled by `strict`.
 * However, it does not check dependencies that are already checked and reported as errors, e.g. `checkJs` without `allowJs`.
 * This function only handles boolean flags.
 *
 * @category Compiler Options
 * @example
 * ```ts
 * const options = {
 * 	allowJs: true,
 * };
 *
 * isCompilerOptionEnabled(options, "allowJs"); // true
 * isCompilerOptionEnabled(options, "allowSyntheticDefaultImports"); // false
 * ```
 */
export function isCompilerOptionEnabled(
	options: ts.CompilerOptions,
	option: BooleanCompilerOptions
): boolean {
	switch (option) {
		case "stripInternal":
		case "declarationMap":
		case "emitDeclarationOnly":
			return (
				options[option] === true &&
				isCompilerOptionEnabled(options, "declaration")
			);
		case "declaration":
			return (
				// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
				options.declaration || isCompilerOptionEnabled(options, "composite")
			);
		case "incremental":
			return options.incremental === undefined
				? isCompilerOptionEnabled(options, "composite")
				: options.incremental;
		case "skipDefaultLibCheck":
			return (
				// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
				options.skipDefaultLibCheck ||
				isCompilerOptionEnabled(options, "skipLibCheck")
			);
		case "suppressImplicitAnyIndexErrors":
			return (
				options.suppressImplicitAnyIndexErrors === true &&
				isCompilerOptionEnabled(options, "noImplicitAny")
			);
		case "allowSyntheticDefaultImports":
			return options.allowSyntheticDefaultImports !== undefined
				? options.allowSyntheticDefaultImports
				: isCompilerOptionEnabled(options, "esModuleInterop") ||
						options.module === ts.ModuleKind.System;
		case "noUncheckedIndexedAccess":
			return (
				options.noUncheckedIndexedAccess === true &&
				isCompilerOptionEnabled(options, "strictNullChecks")
			);
		case "allowJs":
			return options.allowJs === undefined
				? isCompilerOptionEnabled(options, "checkJs")
				: options.allowJs;
		case "noImplicitAny":
		case "noImplicitThis":
		case "strictNullChecks":
		case "strictFunctionTypes":
		case "strictPropertyInitialization":
		case "alwaysStrict":
		case "strictBindCallApply":
			type AssertEqual<T, U extends T> = U; // make sure all strict options are handled here
			return isStrictCompilerOptionEnabled(
				options,
				option as AssertEqual<typeof option, StrictCompilerOption>
			);
	}
	return options[option] === true;
}

/**
 * An option that can be tested with {@link isStrictCompilerOptionEnabled}.
 *
 * @category Compiler Options
 */
export type StrictCompilerOption =
	| "alwaysStrict"
	| "noImplicitAny"
	| "noImplicitThis"
	| "strictBindCallApply"
	| "strictFunctionTypes"
	| "strictNullChecks"
	| "strictPropertyInitialization";

/**
 * Checks if a given compiler option is enabled, accounting for whether all flags
 * (except `strictPropertyInitialization`) have been enabled by `strict: true`.
 *
 * @category Compiler Options
 * @example
 * ```ts
 * const optionsLenient = {
 * 	noImplicitAny: true,
 * };
 *
 * isStrictCompilerOptionEnabled(optionsLenient, "noImplicitAny"); // true
 * isStrictCompilerOptionEnabled(optionsLenient, "noImplicitThis"); // false
 * ```
 *
 * @example
 * ```ts
 * const optionsStrict = {
 * 	noImplicitThis: false,
 * 	strict: true,
 * };
 *
 * isStrictCompilerOptionEnabled(optionsStrict, "noImplicitAny"); // true
 * isStrictCompilerOptionEnabled(optionsStrict, "noImplicitThis"); // false
 * ```
 */
export function isStrictCompilerOptionEnabled(
	options: ts.CompilerOptions,
	option: StrictCompilerOption
): boolean {
	return (
		(options.strict ? options[option] !== false : options[option] === true) &&
		(option !== "strictPropertyInitialization" ||
			isStrictCompilerOptionEnabled(options, "strictNullChecks"))
	);
}
