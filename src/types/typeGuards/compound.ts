import * as ts from "typescript";

import { isTypeFlagSet } from "../../flags.js";
import { isTupleType, isTypeReference } from "./objects.js";

/**
 * `LiteralType` from typescript except that it allows for it to work on arbitrary types.
 *
 * @category Type Types
 */
export interface UnknownLiteralType extends ts.Type {
	freshType: UnknownLiteralType;
	regularType: UnknownLiteralType;
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
	value: true;
}

/**
 * A "false" literal.
 *
 * @category Type Types
 */
export interface FalseLiteralType extends BooleanLiteralType {
	value: false;
}

/**
 * Test if a type is a {@link UnknownLiteralType}?
 *
 * @param type
 * @returns
 */
export function isUnknownLiteralType(
	type: ts.Type
): type is UnknownLiteralType {
	return isTypeFlagSet(type, ts.TypeFlags.Literal);
}

/**
 * Determines whether the given type is a boolean literal type.
 *
 * @category Types - Utilities
 */
export function isBooleanLiteralType(type: ts.Type): type is BooleanLiteralType;

/**
 * Determines whether the given type is a boolean literal type for "true".
 *
 * @category Types - Utilities
 */
export function isBooleanLiteralType(
	type: ts.Type,
	literal: true
): type is TrueLiteralType;

/**
 * Determines whether the given type is a boolean literal type for "false".
 *
 * @category Types - Utilities
 */
export function isBooleanLiteralType(
	type: ts.Type,
	literal: false
): type is FalseLiteralType;

export function isBooleanLiteralType(
	type: ts.Type,
	literal?: boolean
): boolean {
	return (
		isTypeFlagSet(type, ts.TypeFlags.BooleanLiteral) &&
		(literal === undefined ||
			(type as unknown as { intrinsicName: string }).intrinsicName ===
				(literal ? "true" : "false"))
	);
}

/**
 * Determines whether the given type is a boolean literal type for "true".
 *
 * @category Types - Utilities
 */
export function isTrueLiteralType(type: ts.Type): type is TrueLiteralType {
	return isBooleanLiteralType(type, true);
}

/**
 * Determines whether the given type is a boolean literal type for "false".
 *
 * @category Types - Utilities
 */
export function isFalseLiteralType(type: ts.Type): type is FalseLiteralType {
	return isBooleanLiteralType(type, false);
}

export function isTupleTypeReference(
	type: ts.Type
): type is ts.TupleTypeReference {
	return isTypeReference(type) && isTupleType(type.target);
}
