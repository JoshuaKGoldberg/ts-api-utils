import * as ts from "typescript";

import { isInterfaceType, isTupleType, isTypeReference } from "./objects.js";

export function isGenericType(type: ts.Type): type is ts.GenericType {
	return isTypeReference(type) && isInterfaceType(type);
}

export function isTupleTypeReference(
	type: ts.Type
): type is ts.TupleTypeReference {
	return isTypeReference(type) && isTupleType(type.target);
}
