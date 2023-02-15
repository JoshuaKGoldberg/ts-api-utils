import * as ts from "typescript";

import { isObjectFlagSet } from "../../flags.js";
import { isGenericType } from "./compound.js";
import { isObjectType } from "./simple.js";

export function isEvolvingArrayType(
	type: ts.Type
): type is ts.EvolvingArrayType {
	return (
		isObjectType(type) && isObjectFlagSet(type, ts.ObjectFlags.EvolvingArray)
	);
}

export function isInterfaceType(type: ts.Type): type is ts.InterfaceType {
	// isObjectFlagSet(type, ts.ObjectFlags.ClassOrInterface)

	return (
		isObjectType(type) &&
		"typeParameters" in type &&
		"outerTypeParameters" in type &&
		"localTypeParameters" in type &&
		"thisType" in type
	);
}

export function isInterfaceTypeWithDeclaredMembers(
	type: ts.Type
): type is ts.InterfaceTypeWithDeclaredMembers {
	return (
		isInterfaceType(type) &&
		"declaredProperties" in type &&
		"declaredCallSignatures" in type &&
		"declaredConstructSignatures" in type &&
		"declaredIndexInfos" in type
	);
}

export function isTupleType(type: ts.Type): type is ts.TupleType {
	return isGenericType(type) && isObjectFlagSet(type, ts.ObjectFlags.Tuple);
}

export function isTypeReference(type: ts.Type): type is ts.TypeReference {
	return isObjectType(type) && isObjectFlagSet(type, ts.ObjectFlags.Reference);
}
