import ts from "typescript";

import { isTypeFlagSet } from "../../flags";
import { isTupleType, isTypeReference } from "./objects";

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
 * A type that is both an `IntrinsicType` and a `FreshableType`
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
 * A boolean literal.
 *
 * @category Type Types
 */
export interface BooleanLiteralType extends UnknownLiteralType {
	value: boolean;
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
 * A "false" literal.
 *
 * @category Type Types
 */
export interface FalseLiteralType extends BooleanLiteralType {
	intrinsicName: "false";
	value: false;
}

// ts.TypeFlags.Intrinsic
const IntrinsicTypeFlags =
	(ts.TypeFlags as any).Intrinsic ??
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
