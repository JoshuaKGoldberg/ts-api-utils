import * as ts from "typescript";

import { isTupleType, isTypeReference } from "./objects.js";

/**
 * Test if a type is a `TupleTypeReference`.
 *
 * @category Types - Type Guards
 */
export function isTupleTypeReference(
	type: ts.Type
): type is ts.TupleTypeReference {
	return isTypeReference(type) && isTupleType(type.target);
}
