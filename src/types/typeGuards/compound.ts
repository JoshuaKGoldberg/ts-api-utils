import * as ts from "typescript";

import { isTupleType, isTypeReference } from "./objects.js";

export function isTupleTypeReference(
	type: ts.Type
): type is ts.TupleTypeReference {
	return isTypeReference(type) && isTupleType(type.target);
}
