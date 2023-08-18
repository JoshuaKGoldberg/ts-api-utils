import ts from "typescript";

import { isTypeFlagSet } from "../../flags";

/**
 * A "any" intrinsic type.
 *
 * @category Type Types
 */
export interface IntrinsicAnyType extends IntrinsicType {
	intrinsicName: "any";
}

/**
 * Determines whether the given type is the "any" intrinsic type.
 *
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
 * A "boolean" intrinsic type.
 *
 * @category Type Types
 */
export interface IntrinsicBooleanType extends IntrinsicType {
	intrinsicName: "boolean";
}

/**
 * Determines whether the given type is the "boolean" intrinsic type.
 *
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
 * A "bigint" intrinsic type.
 *
 * @category Type Types
 */
export interface IntrinsicBigIntType extends IntrinsicType {
	intrinsicName: "bigint";
}

/**
 * Determines whether the given type is the "bigint" intrinsic type.
 *
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
 * An "error" intrinsic type.
 *
 * This refers to a type generated when TypeScript encounters an error while
 * trying to resolve the type.
 *
 * @category Type Types
 */
export interface IntrinsicErrorType extends IntrinsicType {
	intrinsicName: "error";
}

/**
 * Determines whether the given type is the "error" intrinsic type.
 *
 * The intrinsic error type occurs when TypeScript encounters an error while
 * trying to resolve the type.
 *
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
 * A "symbol" intrinsic type.
 *
 * @category Type Types
 */
export interface IntrinsicESSymbolType extends IntrinsicType {
	intrinsicName: "symbol";
}

/**
 * Determines whether the given type is the "symbol" intrinsic type.
 *
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

/**
 * An intrinsic type.
 *
 * @category Type Types
 */
export interface IntrinsicType extends ts.Type {
	intrinsicName: string;
	objectFlags: ts.ObjectFlags;
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
 * Test if a type is an {@link IntrinsicType}.
 *
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
 * A "never" intrinsic type.
 *
 * @category Type Types
 */
export interface IntrinsicNeverType extends IntrinsicType {
	intrinsicName: "never";
}

/**
 * Determines whether the given type is the "never" intrinsic type.
 *
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
 * A non-primitive intrinsic type.
 * E.g. An "object" intrinsic type.
 *
 * @category Type Types
 */
export interface IntrinsicNonPrimitiveType extends IntrinsicType {
	intrinsicName: "";
}

/**
 * Determines whether the given type is a non-primitive intrinsic type.
 * E.g. An "object" intrinsic type.
 *
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
 * A "null" intrinsic type.
 *
 * @category Type Types
 */
export interface IntrinsicNullType extends IntrinsicType {
	intrinsicName: "null";
}

/**
 * Determines whether the given type is the "null" intrinsic type.
 *
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
 * A "number" intrinsic type.
 *
 * @category Type Types
 */
export interface IntrinsicNumberType extends IntrinsicType {
	intrinsicName: "number";
}

/**
 * Determines whether the given type is the "number" intrinsic type.
 *
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
 * A "string" intrinsic type.
 *
 * @category Type Types
 */
export interface IntrinsicStringType extends IntrinsicType {
	intrinsicName: "string";
}

/**
 * Determines whether the given type is the "string" intrinsic type.
 *
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
 * An "undefined" intrinsic type.
 *
 * @category Type Types
 */
export interface IntrinsicUndefinedType extends IntrinsicType {
	intrinsicName: "undefined";
}

/**
 * Determines whether the given type is the "undefined" intrinsic type.
 *
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
 * An "unknown" intrinsic type.
 *
 * @category Type Types
 */
export interface IntrinsicUnknownType extends IntrinsicType {
	intrinsicName: "unknown";
}

/**
 * Determines whether the given type is the "unknown" intrinsic type.
 *
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
 * A "void" intrinsic type.
 *
 * @category Type Types
 */
export interface IntrinsicVoidType extends IntrinsicType {
	intrinsicName: "void";
}

/**
 * Determines whether the given type is the "void" intrinsic type.
 *
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
