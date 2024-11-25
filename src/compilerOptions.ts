// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";

/* eslint-disable jsdoc/informative-docs */
/**
 * An option that can be tested with {@link isCompilerOptionEnabled}.
 * @category Compiler Options
 */
export type BooleanCompilerOptions = keyof {
	[K in keyof ts.CompilerOptions as NonNullable<
		ts.CompilerOptions[K]
	> extends boolean
		? K
		: never]: unknown;
};
/* eslint-enable jsdoc/informative-docs */

/**
 * An option that can be tested with {@link isStrictCompilerOptionEnabled}.
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
 * Checks if a given compiler option is enabled.
 * It handles dependencies of options, e.g. `declaration` is implicitly enabled by `composite` or `strictNullChecks` is enabled by `strict`.
 * However, it does not check dependencies that are already checked and reported as errors, e.g. `checkJs` without `allowJs`.
 * This function only handles boolean flags.
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
	option: BooleanCompilerOptions,
): boolean {
	switch (option) {
		case "allowJs":
			return options.allowJs === undefined
				? isCompilerOptionEnabled(options, "checkJs")
				: options.allowJs;
		case "allowSyntheticDefaultImports":
			return options.allowSyntheticDefaultImports !== undefined
				? options.allowSyntheticDefaultImports
				: isCompilerOptionEnabled(options, "esModuleInterop") ||
						options.module === ts.ModuleKind.System;
		case "alwaysStrict":
		case "noImplicitAny":
		case "noImplicitThis":
		case "strictBindCallApply":
		case "strictFunctionTypes":
		case "strictNullChecks":
		case "strictPropertyInitialization":
			type AssertEqual<T, U extends T> = U; // make sure all strict options are handled here
			return isStrictCompilerOptionEnabled(
				options,
				option as AssertEqual<typeof option, StrictCompilerOption>,
			);
		case "declaration":
			return (
				options.declaration || isCompilerOptionEnabled(options, "composite")
			);
		case "declarationMap":
		case "emitDeclarationOnly":
		case "stripInternal":
			return (
				options[option] === true &&
				isCompilerOptionEnabled(options, "declaration")
			);
		case "incremental":
			return options.incremental === undefined
				? isCompilerOptionEnabled(options, "composite")
				: options.incremental;
		case "noUncheckedIndexedAccess":
			return (
				options.noUncheckedIndexedAccess === true &&
				isCompilerOptionEnabled(options, "strictNullChecks")
			);
		case "skipDefaultLibCheck":
			return (
				options.skipDefaultLibCheck ||
				isCompilerOptionEnabled(options, "skipLibCheck")
			);
		case "suppressImplicitAnyIndexErrors":
			return (
				// eslint-disable-next-line @typescript-eslint/no-deprecated
				options.suppressImplicitAnyIndexErrors === true &&
				isCompilerOptionEnabled(options, "noImplicitAny")
			);
	}

	return options[option] === true;
}

/**
 * Checks if a given compiler option is enabled, accounting for whether all flags
 * (except `strictPropertyInitialization`) have been enabled by `strict: true`.
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
	option: StrictCompilerOption,
): boolean {
	return (
		(options.strict ? options[option] !== false : options[option] === true) &&
		(option !== "strictPropertyInitialization" ||
			isStrictCompilerOptionEnabled(options, "strictNullChecks"))
	);
}
