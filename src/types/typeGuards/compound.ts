import ts from "typescript";

import { isTupleType, isTypeReference } from "./objects";
import { type IntrinsicType, isFreshableType, isIntrinsicType } from "./simple";

/**
 * A type that is both an {@link IntrinsicType} and a `FreshableType`
 *
 * @category Type Types
 */
export interface FreshableIntrinsicType
	extends ts.FreshableType,
		IntrinsicType {}

/**
 * Test if a type is a `FreshableIntrinsicType`.
 *
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isFreshableIntrinsicType(type)) {
 *   // ...
 * }
 */
export function isFreshableIntrinsicType(
	type: ts.Type
): type is FreshableIntrinsicType {
	return isIntrinsicType(type) && isFreshableType(type);
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
