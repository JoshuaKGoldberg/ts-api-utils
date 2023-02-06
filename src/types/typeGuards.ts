// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";

export function isConditionalType(type: ts.Type): type is ts.ConditionalType {
	return (type.flags & ts.TypeFlags.Conditional) !== 0;
}

export function isIntersectionType(type: ts.Type): type is ts.IntersectionType {
	return (type.flags & ts.TypeFlags.Intersection) !== 0;
}

export function isLiteralType(type: ts.Type): type is ts.LiteralType {
	return (
		(type.flags &
			(ts.TypeFlags.StringOrNumberLiteral | ts.TypeFlags.BigIntLiteral)) !==
		0
	);
}

export function isObjectType(type: ts.Type): type is ts.ObjectType {
	return (type.flags & ts.TypeFlags.Object) !== 0;
}

export function isUnionOrIntersectionType(
	type: ts.Type
): type is ts.UnionOrIntersectionType {
	return (type.flags & ts.TypeFlags.UnionOrIntersection) !== 0;
}

export function isUniqueESSymbolType(
	type: ts.Type
): type is ts.UniqueESSymbolType {
	return (type.flags & ts.TypeFlags.UniqueESSymbol) !== 0;
}

export function isUnionType(type: ts.Type): type is ts.UnionType {
	return (type.flags & ts.TypeFlags.Union) !== 0;
}

export function isTupleType(type: ts.Type): type is ts.TupleType {
	return (
		(type.flags & ts.TypeFlags.Object &&
			(type as ts.ObjectType).objectFlags & ts.ObjectFlags.Tuple) !== 0
	);
}

export type TupleTypeReference = ts.TypeReference & {
	target: ts.TupleType;
};

export function isTupleTypeReference(
	type: ts.Type
): type is TupleTypeReference {
	return isTypeReference(type) && isTupleType(type.target);
}

export function isTypeReference(type: ts.Type): type is ts.TypeReference {
	return (
		(type.flags & ts.TypeFlags.Object) !== 0 &&
		((type as ts.ObjectType).objectFlags & ts.ObjectFlags.Reference) !== 0
	);
}
