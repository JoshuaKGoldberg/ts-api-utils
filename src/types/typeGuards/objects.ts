import * as ts from "typescript";

import { isObjectFlagSet } from "../../flags.js";
import { isObjectType } from "./simple.js";

export function isEvolvingArrayType(
	type: ts.Type
): type is ts.EvolvingArrayType {
	return (
		isObjectType(type) && isObjectFlagSet(type, ts.ObjectFlags.EvolvingArray)
	);
}

export function isTupleType(type: ts.Type): type is ts.TupleType {
	return isObjectType(type) && isObjectFlagSet(type, ts.ObjectFlags.Tuple);
}

export function isTypeReference(type: ts.Type): type is ts.TypeReference {
	return isObjectType(type) && isObjectFlagSet(type, ts.ObjectFlags.Reference);
}
