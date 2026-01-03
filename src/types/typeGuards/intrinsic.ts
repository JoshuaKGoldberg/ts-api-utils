import * as ts from "typescript";

import { isTypeFlagSet } from "../../flags";

/**
 * A "any" intrinsic type.
 * @category Type Types
 */
export interface IntrinsicAnyType extends IntrinsicType {
	intrinsicName: "any";
}

/**
 * A "bigint" intrinsic type.
 * @category Type Types
 */
export interface IntrinsicBigIntType extends IntrinsicType {
	intrinsicName: "bigint";
}

/**
 * A "boolean" intrinsic type.
 * @category Type Types
 */
export interface IntrinsicBooleanType extends IntrinsicType {
	intrinsicName: "boolean";
}

/**
 * An "error" intrinsic type.
 *
 * This refers to a type generated when TypeScript encounters an error while
 * trying to resolve the type.
 * @category Type Types
 */
export interface IntrinsicErrorType extends IntrinsicType {
	intrinsicName: "error";
}

/**
 * A "symbol" intrinsic type.
 * @category Type Types
 */
export interface IntrinsicESSymbolType extends IntrinsicType {
	intrinsicName: "symbol";
}

/**
 * An "intrinsic" (built-in to TypeScript) type.
 * @category Type Types
 */
export interface IntrinsicType extends ts.Type {
	intrinsicName: string;
	objectFlags: ts.ObjectFlags;
}

/**
 * Determines whether the given type is the "any" intrinsic type.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isIntrinsicAnyType(type)) {
 *   // ...
 * }
 * ```
 */
export function isIntrinsicAnyType(type: ts.Type): type is IntrinsicAnyType {
	return isTypeFlagSet(type, ts.TypeFlags.Any);
}

/**
 * Determines whether the given type is the "bigint" intrinsic type.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isIntrinsicBigIntType(type)) {
 *   // ...
 * }
 * ```
 */
export function isIntrinsicBigIntType(
	type: ts.Type,
): type is IntrinsicBigIntType {
	return isTypeFlagSet(type, ts.TypeFlags.BigInt);
}

/**
 * Determines whether the given type is the "boolean" intrinsic type.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isIntrinsicBooleanType(type)) {
 *   // ...
 * }
 * ```
 */
export function isIntrinsicBooleanType(
	type: ts.Type,
): type is IntrinsicBooleanType {
	return isTypeFlagSet(type, ts.TypeFlags.Boolean);
}

/**
 * Determines whether the given type is the "error" intrinsic type.
 *
 * The intrinsic error type occurs when TypeScript encounters an error while
 * trying to resolve the type.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isIntrinsicErrorType(type)) {
 *   // ...
 * }
 * ```
 */
export function isIntrinsicErrorType(
	type: ts.Type,
): type is IntrinsicErrorType {
	return isIntrinsicType(type) && type.intrinsicName === "error";
}

/**
 * Determines whether the given type is the "symbol" intrinsic type.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isIntrinsicESSymbolType(type)) {
 *   // ...
 * }
 * ```
 */
export function isIntrinsicESSymbolType(
	type: ts.Type,
): type is IntrinsicESSymbolType {
	return isTypeFlagSet(type, ts.TypeFlags.ESSymbol);
}

// ts.TypeFlags.Intrinsic
const IntrinsicTypeFlags =
	(ts.TypeFlags as { Intrinsic?: number }).Intrinsic ??
	ts.TypeFlags.Any |
		ts.TypeFlags.Unknown |
		ts.TypeFlags.String |
		ts.TypeFlags.Number |
		ts.TypeFlags.BigInt |
		ts.TypeFlags.Boolean |
		ts.TypeFlags.BooleanLiteral |
		ts.TypeFlags.ESSymbol |
		ts.TypeFlags.Void |
		ts.TypeFlags.Undefined |
		ts.TypeFlags.Null |
		ts.TypeFlags.Never |
		ts.TypeFlags.NonPrimitive;

/**
 * A "never" intrinsic type.
 * @category Type Types
 */
export interface IntrinsicNeverType extends IntrinsicType {
	intrinsicName: "never";
}

/**
 * A non-primitive intrinsic type.
 * E.g. An "object" intrinsic type.
 * @category Type Types
 */
export interface IntrinsicNonPrimitiveType extends IntrinsicType {
	intrinsicName: "";
}

/**
 * A "null" intrinsic type.
 * @category Type Types
 */
export interface IntrinsicNullType extends IntrinsicType {
	intrinsicName: "null";
}

/**
 * A "number" intrinsic type.
 * @category Type Types
 */
export interface IntrinsicNumberType extends IntrinsicType {
	intrinsicName: "number";
}

/**
 * A "string" intrinsic type.
 * @category Type Types
 */
export interface IntrinsicStringType extends IntrinsicType {
	intrinsicName: "string";
}

/**
 * The built-in `undefined` type.
 * @category Type Types
 */
export interface IntrinsicUndefinedType extends IntrinsicType {
	intrinsicName: "undefined";
}

/**
 * The built-in `unknown` type.
 * @category Type Types
 */
export interface IntrinsicUnknownType extends IntrinsicType {
	intrinsicName: "unknown";
}

/**
 * A "void" intrinsic type.
 * @category Type Types
 */
export interface IntrinsicVoidType extends IntrinsicType {
	intrinsicName: "void";
}

/**
 * Determines whether the given type is the "never" intrinsic type.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isIntrinsicNeverType(type)) {
 *   // ...
 * }
 * ```
 */
export function isIntrinsicNeverType(
	type: ts.Type,
): type is IntrinsicNeverType {
	return isTypeFlagSet(type, ts.TypeFlags.Never);
}

/**
 * Determines whether the given type is a non-primitive intrinsic type.
 * E.g. An "object" intrinsic type.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isIntrinsicNonPrimitiveType(type)) {
 *   // ...
 * }
 * ```
 */
export function isIntrinsicNonPrimitiveType(
	type: ts.Type,
): type is IntrinsicNonPrimitiveType {
	return isTypeFlagSet(type, ts.TypeFlags.NonPrimitive);
}

/**
 * Determines whether the given type is the "null" intrinsic type.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isIntrinsicNullType(type)) {
 *   // ...
 * }
 * ```
 */
export function isIntrinsicNullType(type: ts.Type): type is IntrinsicNullType {
	return isTypeFlagSet(type, ts.TypeFlags.Null);
}

/**
 * Determines whether the given type is the "number" intrinsic type.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isIntrinsicNumberType(type)) {
 *   // ...
 * }
 * ```
 */
export function isIntrinsicNumberType(
	type: ts.Type,
): type is IntrinsicNumberType {
	return isTypeFlagSet(type, ts.TypeFlags.Number);
}

/**
 * Determines whether the given type is the "string" intrinsic type.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isIntrinsicStringType(type)) {
 *   // ...
 * }
 * ```
 */
export function isIntrinsicStringType(
	type: ts.Type,
): type is IntrinsicStringType {
	return isTypeFlagSet(type, ts.TypeFlags.String);
}

/**
 * Test if a type is an {@link IntrinsicType}.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isIntrinsicType(type)) {
 *   // ...
 * }
 * ```
 */
export function isIntrinsicType(type: ts.Type): type is IntrinsicType {
	return isTypeFlagSet(type, IntrinsicTypeFlags);
}

/**
 * Determines whether the given type is the "undefined" intrinsic type.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isIntrinsicUndefinedType(type)) {
 *   // ...
 * }
 * ```
 */
export function isIntrinsicUndefinedType(
	type: ts.Type,
): type is IntrinsicUndefinedType {
	return isTypeFlagSet(type, ts.TypeFlags.Undefined);
}

/**
 * Determines whether the given type is the "unknown" intrinsic type.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isIntrinsicUnknownType(type)) {
 *   // ...
 * }
 * ```
 */
export function isIntrinsicUnknownType(
	type: ts.Type,
): type is IntrinsicUnknownType {
	return isTypeFlagSet(type, ts.TypeFlags.Unknown);
}

/**
 * Determines whether the given type is the "void" intrinsic type.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isIntrinsicVoidType(type)) {
 *   // ...
 * }
 * ```
 */
export function isIntrinsicVoidType(type: ts.Type): type is IntrinsicVoidType {
	return isTypeFlagSet(type, ts.TypeFlags.Void);
}
