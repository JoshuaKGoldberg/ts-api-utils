import ts from "typescript";

import { isTypeFlagSet } from "../../flags";
import { isTupleType, isTypeReference } from "./objects";

/**
 * A "any" intrinsic type.
 *
 * @category Type Types
 */
export interface AnyType extends IntrinsicType {
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
 * if (isAnyType(type)) {
 *   // ...
 * }
 * ```
 */
export function isAnyType(type: ts.Type): type is AnyType {
	return isTypeFlagSet(type, ts.TypeFlags.Any);
}

/**
 * A "bigint" intrinsic type.
 *
 * @category Type Types
 */
export interface BigIntType extends IntrinsicType {
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
 * if (isBigIntType(type)) {
 *   // ...
 * }
 * ```
 */
export function isBigIntType(type: ts.Type): type is BigIntType {
	return isTypeFlagSet(type, ts.TypeFlags.BigInt);
}

/**
 * A "boolean" intrinsic type.
 *
 * @category Type Types
 */
export interface BooleanType extends IntrinsicType {
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
 * if (isBooleanType(type)) {
 *   // ...
 * }
 * ```
 */
export function isBooleanType(type: ts.Type): type is BooleanType {
	return isTypeFlagSet(type, ts.TypeFlags.Boolean);
}

/**
 * A boolean literal.
 * i.e. Either a "true" or "false" literal.
 *
 * @category Type Types
 */
export interface BooleanLiteralType extends UnknownLiteralType {
	intrinsicName: "true" | "false";
	value: boolean;
}

/**
 * Determines whether the given type is a boolean literal type.
 *
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
	type: ts.Type
): type is BooleanLiteralType {
	return isTypeFlagSet(type, ts.TypeFlags.BooleanLiteral);
}

/**
 * A "true" literal.
 *
 * @category Type Types
 */
export interface TrueLiteralType extends BooleanLiteralType {
	intrinsicName: "true";
	value: true;
}

/**
 * Determines whether the given type is a boolean literal type for "true".
 *
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
 * A "false" literal.
 *
 * @category Type Types
 */
export interface FalseLiteralType extends BooleanLiteralType {
	intrinsicName: "false";
	value: false;
}

/**
 * Determines whether the given type is a boolean literal type for "false".
 *
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
 * A "symbol" intrinsic type.
 *
 * @category Type Types
 */
export interface ESSymbolType extends IntrinsicType {
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
 * if (isESSymbolType(type)) {
 *   // ...
 * }
 * ```
 */
export function isESSymbolType(type: ts.Type): type is ESSymbolType {
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

	return isTypeFlagSet(type, IntrinsicTypeFlags);
}

/**
 * A "never" intrinsic type.
 *
 * @category Type Types
 */
export interface NeverType extends IntrinsicType {
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
 * if (isNeverType(type)) {
 *   // ...
 * }
 * ```
 */
export function isNeverType(type: ts.Type): type is NeverType {
	return isTypeFlagSet(type, ts.TypeFlags.Never);
}

/**
 * A non-primitive intrinsic type.
 * E.g. An "object" intrinsic type.
 *
 * @category Type Types
 */
export interface NonPrimitiveType extends IntrinsicType {
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
 * if (isNeverType(type)) {
 *   // ...
 * }
 * ```
 */
export function isNonPrimitiveType(type: ts.Type): type is NonPrimitiveType {
	return isTypeFlagSet(type, ts.TypeFlags.NonPrimitive);
}

/**
 * A "null" intrinsic type.
 *
 * @category Type Types
 */
export interface NullType extends IntrinsicType {
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
 * if (isNullType(type)) {
 *   // ...
 * }
 * ```
 */
export function isNullType(type: ts.Type): type is NullType {
	return isTypeFlagSet(type, ts.TypeFlags.Null);
}

/**
 * A "number" intrinsic type.
 *
 * @category Type Types
 */
export interface NumberType extends IntrinsicType {
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
 * if (isNumberType(type)) {
 *   // ...
 * }
 * ```
 */
export function isNumberType(type: ts.Type): type is NumberType {
	return isTypeFlagSet(type, ts.TypeFlags.Number);
}

/**
 * A "string" intrinsic type.
 *
 * @category Type Types
 */
export interface StringType extends IntrinsicType {
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
 * if (isStringType(type)) {
 *   // ...
 * }
 * ```
 */
export function isStringType(type: ts.Type): type is StringType {
	return isTypeFlagSet(type, ts.TypeFlags.String);
}

/**
 * Test if a type is a `TupleTypeReference`.
 *
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isTupleTypeReference(type)) {
 *   // ...
 * }
 */
export function isTupleTypeReference(
	type: ts.Type
): type is ts.TupleTypeReference {
	return isTypeReference(type) && isTupleType(type.target);
}

/**
 * An "undefined" intrinsic type.
 *
 * @category Type Types
 */
export interface UndefinedType extends IntrinsicType {
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
 * if (isUndefinedType(type)) {
 *   // ...
 * }
 * ```
 */
export function isUndefinedType(type: ts.Type): type is UndefinedType {
	return isTypeFlagSet(type, ts.TypeFlags.Undefined);
}

/**
 * A type that is both an {@link IntrinsicType} and a `FreshableType`
 *
 * @category Type Types
 */
export interface FreshableIntrinsicType
	extends ts.FreshableType,
		IntrinsicType {}

/**
 * `LiteralType` from typescript except that it allows for it to work on arbitrary types.
 *
 * @category Type Types
 */
export interface UnknownLiteralType extends FreshableIntrinsicType {
	value: unknown;
}

/**
 * Test if a type is a {@link UnknownLiteralType}?
 *
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
	type: ts.Type
): type is UnknownLiteralType {
	return isTypeFlagSet(type, ts.TypeFlags.Literal);
}

/**
 * An "unknown" intrinsic type.
 *
 * @category Type Types
 */
export interface UnknownType extends IntrinsicType {
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
 * if (isUnknownType(type)) {
 *   // ...
 * }
 * ```
 */
export function isUnknownType(type: ts.Type): type is UnknownType {
	return isTypeFlagSet(type, ts.TypeFlags.Unknown);
}

/**
 * A "void" intrinsic type.
 *
 * @category Type Types
 */
export interface VoidType extends IntrinsicType {
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
 * if (isVoidType(type)) {
 *   // ...
 * }
 * ```
 */
export function isVoidType(type: ts.Type): type is VoidType {
	return isTypeFlagSet(type, ts.TypeFlags.Void);
}
