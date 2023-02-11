import ts from "typescript";

import { isTypeFlagSet } from "../../flags.js";

export function isBigIntLiteralType(
	type: ts.Type
): type is ts.BigIntLiteralType {
	return isTypeFlagSet(type, ts.TypeFlags.BigIntLiteral);
}

export function isConditionalType(type: ts.Type): type is ts.ConditionalType {
	return isTypeFlagSet(type, ts.TypeFlags.Conditional);
}

export function isEnumType(type: ts.Type): type is ts.EnumType {
	return isTypeFlagSet(type, ts.TypeFlags.Enum);
}

export function isIndexType(type: ts.Type): type is ts.IndexType {
	return isTypeFlagSet(type, ts.TypeFlags.Index);
}

export function isIndexedAccessType(
	type: ts.Type
): type is ts.IndexedAccessType {
	return isTypeFlagSet(type, ts.TypeFlags.IndexedAccess);
}

export function isInstantiableType(type: ts.Type): type is ts.InstantiableType {
	return isTypeFlagSet(type, ts.TypeFlags.Instantiable);
}

export function isIntersectionType(type: ts.Type): type is ts.IntersectionType {
	return isTypeFlagSet(type, ts.TypeFlags.Intersection);
}

export function isLiteralType(type: ts.Type): type is ts.LiteralType {
	return isTypeFlagSet(type, ts.TypeFlags.Literal);
}

export function isNumberLiteralType(
	type: ts.Type
): type is ts.NumberLiteralType {
	return isTypeFlagSet(type, ts.TypeFlags.NumberLiteral);
}

export function isObjectType(type: ts.Type): type is ts.ObjectType {
	return isTypeFlagSet(type, ts.TypeFlags.Object);
}

export function isStringLiteralType(
	type: ts.Type
): type is ts.StringLiteralType {
	return isTypeFlagSet(type, ts.TypeFlags.StringLiteral);
}

export function isStringMappingType(
	type: ts.Type
): type is ts.StringMappingType {
	return isTypeFlagSet(type, ts.TypeFlags.StringMapping);
}

export function isSubstitutionType(type: ts.Type): type is ts.SubstitutionType {
	return isTypeFlagSet(type, ts.TypeFlags.Substitution);
}

export function isTemplateLiteralType(
	type: ts.Type
): type is ts.TemplateLiteralType {
	return isTypeFlagSet(type, ts.TypeFlags.TemplateLiteral);
}

export function isTypeParameter(type: ts.Type): type is ts.TypeParameter {
	return isTypeFlagSet(type, ts.TypeFlags.TypeParameter);
}

export function isTypeVariable(type: ts.Type): type is ts.TypeVariable {
	return isTypeFlagSet(type, ts.TypeFlags.TypeVariable);
}

export function isUnionType(type: ts.Type): type is ts.UnionType {
	return isTypeFlagSet(type, ts.TypeFlags.Union);
}

export function isUnionOrIntersectionType(
	type: ts.Type
): type is ts.UnionOrIntersectionType {
	return isTypeFlagSet(type, ts.TypeFlags.UnionOrIntersection);
}

export function isUniqueESSymbolType(
	type: ts.Type
): type is ts.UniqueESSymbolType {
	return isTypeFlagSet(type, ts.TypeFlags.UniqueESSymbol);
}

/*
 * No TypeScript defined type exists for types with these type flags.
 */

// export function isAnyType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.Any); }
// export function isBigIntLikeType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.BigIntLike); }
// export function isBigIntType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.BigInt); }
// export function isBooleanLikeType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.BooleanLike); }
// export function isBooleanLiteralType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.BooleanLiteral); }
// export function isBooleanType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.Boolean); }
// export function isEnumLikeType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.EnumLike); }
// export function isEnumLiteralType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.EnumLiteral); }
// export function isESSymbolLikeType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.ESSymbolLike); }
// export function isESSymbolType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.ESSymbol); }
// export function isInstantiableNonPrimitiveType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.InstantiableNonPrimitive); }
// export function isInstantiablePrimitiveType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.InstantiablePrimitive); }
// export function isNarrowableType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.Narrowable); }
// export function isNeverType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.Never); }
// export function isNonPrimitiveType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.NonPrimitive); }
// export function isNullType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.Null); }
// export function isNumberLikeType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.NumberLike); }
// export function isNumberType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.Number); }
// export function isPossiblyFalsyType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.PossiblyFalsy); }
// export function isStringLikeType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.StringLike); }
// export function isStringOrNumberLiteralType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.StringOrNumberLiteral); }
// export function isStringType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.String); }
// export function isStructuredOrInstantiableType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.StructuredOrInstantiable); }
// export function isStructuredTypeType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.StructuredType); }
// export function isUndefinedType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.Undefined); }
// export function isUnitType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.Unit); }
// export function isUnknownType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.Unknown); }
// export function isVoidLikeType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.VoidLike); }
// export function isVoidType(type: ts.Type): boolean { return isTypeFlagSet(type, ts.TypeFlags.Void); }
