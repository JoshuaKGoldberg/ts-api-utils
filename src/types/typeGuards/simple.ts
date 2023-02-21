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
	return type.isLiteral();
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
