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

/*
 * No TypeScript defined type exists for types with these object flags.
 */

// export function isAnonymousType(type: ts.Type): boolean { return isObjectType(type) && isObjectFlagSet(type, ts.ObjectFlags.Anonymous); }
// export function isArrayLiteralType(type: ts.Type): boolean { return isObjectType(type) && isObjectFlagSet(type, ts.ObjectFlags.ArrayLiteral); }
// export function isClassOrInterfaceType(type: ts.Type): boolean { return isObjectType(type) && isObjectFlagSet(type, ts.ObjectFlags.ClassOrInterface); }
// export function isClassType(type: ts.Type): boolean { return isObjectType(type) && isObjectFlagSet(type, ts.ObjectFlags.Class); }
// export function isContainsSpreadType(type: ts.Type): boolean { return isObjectType(type) && isObjectFlagSet(type, ts.ObjectFlags.ContainsSpread); }
// export function isFreshLiteralType(type: ts.Type): boolean { return isObjectType(type) && isObjectFlagSet(type, ts.ObjectFlags.FreshLiteral); }
// export function isInstantiatedType(type: ts.Type): boolean { return isObjectType(type) && isObjectFlagSet(type, ts.ObjectFlags.Instantiated); }
// export function isInstantiationExpressionTypeType(type: ts.Type): boolean { return isObjectType(type) && isObjectFlagSet(type, ts.ObjectFlags.InstantiationExpressionType); }
// export function isInterfaceType2(type: ts.Type): boolean { return isObjectType(type) && isObjectFlagSet(type, ts.ObjectFlags.Interface); }
// export function isJSLiteralType(type: ts.Type): boolean { return isObjectType(type) && isObjectFlagSet(type, ts.ObjectFlags.JSLiteral); }
// export function isJsxAttributesType(type: ts.Type): boolean { return isObjectType(type) && isObjectFlagSet(type, ts.ObjectFlags.JsxAttributes); }
// export function isMappedType(type: ts.Type): boolean { return isObjectType(type) && isObjectFlagSet(type, ts.ObjectFlags.Mapped); }
// export function isObjectLiteralPatternWithComputedPropertiesType(type: ts.Type): boolean { return isObjectType(type) && isObjectFlagSet(type, ts.ObjectFlags.ObjectLiteralPatternWithComputedProperties); }
// export function isObjectLiteralType(type: ts.Type): boolean { return isObjectType(type) && isObjectFlagSet(type, ts.ObjectFlags.ObjectLiteral); }
// export function isObjectRestTypeType(type: ts.Type): boolean { return isObjectType(type) && isObjectFlagSet(type, ts.ObjectFlags.ObjectRestType); }
// export function isReferenceType(type: ts.Type): boolean { return isObjectType(type) && isObjectFlagSet(type, ts.ObjectFlags.Reference); }
// export function isReverseMappedType(type: ts.Type): boolean { return isObjectType(type) && isObjectFlagSet(type, ts.ObjectFlags.ReverseMapped); }
