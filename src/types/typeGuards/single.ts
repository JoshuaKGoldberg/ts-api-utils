import ts from "typescript";

import { isTypeFlagSet } from "../../flags";

/**
 * Test if a type is a `ConditionalType`.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isConditionalType(type)) {
 *   // ...
 * }
 * ```
 */
export function isConditionalType(type: ts.Type): type is ts.ConditionalType {
	return isTypeFlagSet(type, ts.TypeFlags.Conditional);
}

/**
 * Test if a type is a `EnumType`.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isEnumType(type)) {
 *   // ...
 * }
 * ```
 */
export function isEnumType(type: ts.Type): type is ts.EnumType {
	return isTypeFlagSet(type, ts.TypeFlags.Enum);
}

/**
 * Test if a type is a `FreshableType`.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isFreshableType(type)) {
 *   // ...
 * }
 * ```
 */
export function isFreshableType(type: ts.Type): type is ts.FreshableType {
	return isTypeFlagSet(type, ts.TypeFlags.Freshable);
}

/**
 * Test if a type is a `IndexType`.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isIndexType(type)) {
 *   // ...
 * }
 * ```
 */
export function isIndexType(type: ts.Type): type is ts.IndexType {
	return isTypeFlagSet(type, ts.TypeFlags.Index);
}

/**
 * Test if a type is a `IndexedAccessType`.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isIndexedAccessType(type)) {
 *   // ...
 * }
 * ```
 */
export function isIndexedAccessType(
	type: ts.Type,
): type is ts.IndexedAccessType {
	return isTypeFlagSet(type, ts.TypeFlags.IndexedAccess);
}

/**
 * Test if a type is a `InstantiableType`.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isInstantiableType(type)) {
 *   // ...
 * }
 * ```
 */
export function isInstantiableType(type: ts.Type): type is ts.InstantiableType {
	return isTypeFlagSet(type, ts.TypeFlags.Instantiable);
}

/**
 * Test if a type is a `IntersectionType`.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isIntersectionType(type)) {
 *   // ...
 * }
 * ```
 */
export function isIntersectionType(type: ts.Type): type is ts.IntersectionType {
	return isTypeFlagSet(type, ts.TypeFlags.Intersection);
}

/**
 * Test if a type is a `ObjectType`.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isObjectType(type)) {
 *   // ...
 * }
 * ```
 */
export function isObjectType(type: ts.Type): type is ts.ObjectType {
	return isTypeFlagSet(type, ts.TypeFlags.Object);
}

/**
 * Test if a type is a `StringMappingType`.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isStringMappingType(type)) {
 *   // ...
 * }
 * ```
 */
export function isStringMappingType(
	type: ts.Type,
): type is ts.StringMappingType {
	return isTypeFlagSet(type, ts.TypeFlags.StringMapping);
}

/**
 * Test if a type is a `SubstitutionType`.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isSubstitutionType(type)) {
 *   // ...
 * }
 * ```
 */
export function isSubstitutionType(type: ts.Type): type is ts.SubstitutionType {
	return isTypeFlagSet(type, ts.TypeFlags.Substitution);
}

/**
 * Test if a type is a `TypeParameter`.
 *
 * Note: It is intentional that this is not a type guard.
 * @see https://github.com/JoshuaKGoldberg/ts-api-utils/issues/382
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isTypeParameter(type)) {
 *   // ...
 * }
 * ```
 */
export function isTypeParameter(type: ts.Type): boolean {
	return isTypeFlagSet(type, ts.TypeFlags.TypeParameter);
}

/**
 * Test if a type is a `TypeVariable`.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isTypeVariable(type)) {
 *   // ...
 * }
 * ```
 */
export function isTypeVariable(type: ts.Type): type is ts.TypeVariable {
	return isTypeFlagSet(type, ts.TypeFlags.TypeVariable);
}

/**
 * Test if a type is a `UnionType`.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isUnionType(type)) {
 *   // ...
 * }
 * ```
 */
export function isUnionType(type: ts.Type): type is ts.UnionType {
	return isTypeFlagSet(type, ts.TypeFlags.Union);
}

/**
 * Test if a type is a `UnionOrIntersectionType`.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isUnionOrIntersectionType(type)) {
 *   // ...
 * }
 * ```
 */
export function isUnionOrIntersectionType(
	type: ts.Type,
): type is ts.UnionOrIntersectionType {
	return isTypeFlagSet(type, ts.TypeFlags.UnionOrIntersection);
}

/**
 * Test if a type is a `UniqueESSymbolType`.
 * @category Types - Type Guards
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * if (isUniqueESSymbolType(type)) {
 *   // ...
 * }
 * ```
 */
export function isUniqueESSymbolType(
	type: ts.Type,
): type is ts.UniqueESSymbolType {
	return isTypeFlagSet(type, ts.TypeFlags.UniqueESSymbol);
}
