import ts from "typescript";

import { isTypeFlagSet } from "../../flags.js";

/**
 * Test if a type is a `BigIntLiteralType`.
 *
 * @category Types - Type Guards
 */
export function isBigIntLiteralType(
	type: ts.Type
): type is ts.BigIntLiteralType {
	return isTypeFlagSet(type, ts.TypeFlags.BigIntLiteral);
}

/**
 * Test if a type is a `ConditionalType`.
 *
 * @category Types - Type Guards
 */
export function isConditionalType(type: ts.Type): type is ts.ConditionalType {
	return isTypeFlagSet(type, ts.TypeFlags.Conditional);
}

/**
 * Test if a type is a `EnumType`.
 *
 * @category Types - Type Guards
 */
export function isEnumType(type: ts.Type): type is ts.EnumType {
	return isTypeFlagSet(type, ts.TypeFlags.Enum);
}

/**
 * Test if a type is a `IndexType`.
 *
 * @category Types - Type Guards
 */
export function isIndexType(type: ts.Type): type is ts.IndexType {
	return isTypeFlagSet(type, ts.TypeFlags.Index);
}

/**
 * Test if a type is a `IndexedAccessType`.
 *
 * @category Types - Type Guards
 */
export function isIndexedAccessType(
	type: ts.Type
): type is ts.IndexedAccessType {
	return isTypeFlagSet(type, ts.TypeFlags.IndexedAccess);
}

/**
 * Test if a type is a `InstantiableType`.
 *
 * @category Types - Type Guards
 */
export function isInstantiableType(type: ts.Type): type is ts.InstantiableType {
	return isTypeFlagSet(type, ts.TypeFlags.Instantiable);
}

/**
 * Test if a type is a `IntersectionType`.
 *
 * @category Types - Type Guards
 */
export function isIntersectionType(type: ts.Type): type is ts.IntersectionType {
	return isTypeFlagSet(type, ts.TypeFlags.Intersection);
}

/**
 * Test if a type is a `LiteralType`.
 *
 * @category Types - Type Guards
 */
export function isLiteralType(type: ts.Type): type is ts.LiteralType {
	return isTypeFlagSet(type, ts.TypeFlags.Literal);
}

/**
 * Test if a type is a `NumberLiteralType`.
 *
 * @category Types - Type Guards
 */
export function isNumberLiteralType(
	type: ts.Type
): type is ts.NumberLiteralType {
	return isTypeFlagSet(type, ts.TypeFlags.NumberLiteral);
}

/**
 * Test if a type is a `ObjectType`.
 *
 * @category Types - Type Guards
 */
export function isObjectType(type: ts.Type): type is ts.ObjectType {
	return isTypeFlagSet(type, ts.TypeFlags.Object);
}

/**
 * Test if a type is a `StringLiteralType`.
 *
 * @category Types - Type Guards
 */
export function isStringLiteralType(
	type: ts.Type
): type is ts.StringLiteralType {
	return isTypeFlagSet(type, ts.TypeFlags.StringLiteral);
}

/**
 * Test if a type is a `StringMappingType`.
 *
 * @category Types - Type Guards
 */
export function isStringMappingType(
	type: ts.Type
): type is ts.StringMappingType {
	return isTypeFlagSet(type, ts.TypeFlags.StringMapping);
}

/**
 * Test if a type is a `SubstitutionType`.
 *
 * @category Types - Type Guards
 */
export function isSubstitutionType(type: ts.Type): type is ts.SubstitutionType {
	return isTypeFlagSet(type, ts.TypeFlags.Substitution);
}

/**
 * Test if a type is a `TemplateLiteralType`.
 *
 * @category Types - Type Guards
 */
export function isTemplateLiteralType(
	type: ts.Type
): type is ts.TemplateLiteralType {
	return isTypeFlagSet(type, ts.TypeFlags.TemplateLiteral);
}

/**
 * Test if a type is a `TypeParameter`.
 *
 * @category Types - Type Guards
 */
export function isTypeParameter(type: ts.Type): type is ts.TypeParameter {
	return isTypeFlagSet(type, ts.TypeFlags.TypeParameter);
}

/**
 * Test if a type is a `TypeVariable`.
 *
 * @category Types - Type Guards
 */
export function isTypeVariable(type: ts.Type): type is ts.TypeVariable {
	return isTypeFlagSet(type, ts.TypeFlags.TypeVariable);
}

/**
 * Test if a type is a `UnionType`.
 *
 * @category Types - Type Guards
 */
export function isUnionType(type: ts.Type): type is ts.UnionType {
	return isTypeFlagSet(type, ts.TypeFlags.Union);
}

/**
 * Test if a type is a `UnionOrIntersectionType`.
 *
 * @category Types - Type Guards
 */
export function isUnionOrIntersectionType(
	type: ts.Type
): type is ts.UnionOrIntersectionType {
	return isTypeFlagSet(type, ts.TypeFlags.UnionOrIntersection);
}

/**
 * Test if a type is a `UniqueESSymbolType`.
 *
 * @category Types - Type Guards
 */
export function isUniqueESSymbolType(
	type: ts.Type
): type is ts.UniqueESSymbolType {
	return isTypeFlagSet(type, ts.TypeFlags.UniqueESSymbol);
}
