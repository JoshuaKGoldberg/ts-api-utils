import ts from "typescript";

import { isTypeFlagSet } from "../../flags";
import { type FreshableIntrinsicType } from "./compound";

/**
 * A boolean literal.
 * i.e. Either a "true" or "false" literal.
 * @category Type Types
 */
export interface BooleanLiteralType extends FreshableIntrinsicType {
	intrinsicName: "false" | "true";
}

/**
 * Determines whether the given type is a boolean literal type.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isBooleanLiteralType(type)) {
 *   // ...
 * }
 * ```
 */
export function isBooleanLiteralType(
	type: ts.Type,
): type is BooleanLiteralType {
	return isTypeFlagSet(type, ts.TypeFlags.BooleanLiteral);
}

/**
 * Test if a type is a `BigIntLiteralType`.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isBigIntLiteralType(type)) {
 *   // ...
 * }
 * ```
 */
export function isBigIntLiteralType(
	type: ts.Type,
): type is ts.BigIntLiteralType {
	return isTypeFlagSet(type, ts.TypeFlags.BigIntLiteral);
}

/**
 * A "false" literal.
 * @category Type Types
 */
export interface FalseLiteralType extends BooleanLiteralType {
	intrinsicName: "false";
}

/**
 * Determines whether the given type is a boolean literal type for "false".
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isFalseLiteralType(type)) {
 *   // ...
 * }
 * ```
 */
export function isFalseLiteralType(type: ts.Type): type is FalseLiteralType {
	return isBooleanLiteralType(type) && type.intrinsicName === "false";
}

/**
 * Test if a type is a `LiteralType`.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isLiteralType(type)) {
 *   // ...
 * }
 * ```
 */
export function isLiteralType(type: ts.Type): type is ts.LiteralType {
	return isTypeFlagSet(type, ts.TypeFlags.Literal);
}

/**
 * Test if a type is a `NumberLiteralType`.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isNumberLiteralType(type)) {
 *   // ...
 * }
 * ```
 */
export function isNumberLiteralType(
	type: ts.Type,
): type is ts.NumberLiteralType {
	return isTypeFlagSet(type, ts.TypeFlags.NumberLiteral);
}

/**
 * Test if a type is a `StringLiteralType`.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isStringLiteralType(type)) {
 *   // ...
 * }
 * ```
 */
export function isStringLiteralType(
	type: ts.Type,
): type is ts.StringLiteralType {
	return isTypeFlagSet(type, ts.TypeFlags.StringLiteral);
}

/**
 * Test if a type is a `TemplateLiteralType`.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isTemplateLiteralType(type)) {
 *   // ...
 * }
 * ```
 */
export function isTemplateLiteralType(
	type: ts.Type,
): type is ts.TemplateLiteralType {
	return isTypeFlagSet(type, ts.TypeFlags.TemplateLiteral);
}

/**
 * A "true" literal.
 * @category Type Types
 */
export interface TrueLiteralType extends BooleanLiteralType {
	intrinsicName: "true";
}

/**
 * Determines whether the given type is a boolean literal type for "true".
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isTrueLiteralType(type)) {
 *   // ...
 * }
 * ```
 */
export function isTrueLiteralType(type: ts.Type): type is TrueLiteralType {
	return isBooleanLiteralType(type) && type.intrinsicName === "true";
}

/**
 * `LiteralType` from typescript except that it allows for it to work on arbitrary types.
 * @deprecated Use {@link FreshableIntrinsicType} instead.
 * @category Type Types
 */
export interface UnknownLiteralType extends FreshableIntrinsicType {
	value?: unknown;
}

/**
 * Test if a type is a {@link UnknownLiteralType}.
 * @deprecated Use {@link isFreshableIntrinsicType} instead.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isUnknownLiteralType(type)) {
 *   // ...
 * }
 * ```
 */
export function isUnknownLiteralType(
	type: ts.Type,
	// eslint-disable-next-line deprecation/deprecation
): type is UnknownLiteralType {
	return isTypeFlagSet(type, ts.TypeFlags.Literal);
}
