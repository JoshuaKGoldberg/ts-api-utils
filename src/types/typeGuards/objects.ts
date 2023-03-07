import * as ts from "typescript";

import { isObjectFlagSet } from "../../flags.js";
import { isObjectType } from "./simple.js";

/**
 * Test if a type is a `EvolvingArrayType`.
 *
 * @category Types - Type Guards
 *
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isEvolvingArrayType(type)) {
 *   // ...
 * }
 * ```
 */
export function isEvolvingArrayType(
	type: ts.Type
): type is ts.EvolvingArrayType {
	return (
		isObjectType(type) && isObjectFlagSet(type, ts.ObjectFlags.EvolvingArray)
	);
}

/**
 * Test if a type is a `TupleType`.
 *
 * @category Types - Type Guards
 *
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isTupleType(type)) {
 *   // ...
 * }
 * ```
 */
export function isTupleType(type: ts.Type): type is ts.TupleType {
	return isObjectType(type) && isObjectFlagSet(type, ts.ObjectFlags.Tuple);
}

/**
 * Test if a type is a `TypeReference`.
 *
 * @category Types - Type Guards
 *
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isTypeReference(type)) {
 *   // ...
 * }
 * ```
 */
export function isTypeReference(type: ts.Type): type is ts.TypeReference {
	return isObjectType(type) && isObjectFlagSet(type, ts.ObjectFlags.Reference);
}
