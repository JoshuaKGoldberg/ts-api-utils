// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";

import {
	isIntersectionType,
	isUnionType,
	isUniqueESSymbolType,
} from "../typeguards";

export function getCallSignaturesOfType(
	type: ts.Type
): ReadonlyArray<ts.Signature> {
	if (isUnionType(type)) {
		const signatures = [];
		for (const t of type.types) signatures.push(...getCallSignaturesOfType(t));
		return signatures;
	}
	if (isIntersectionType(type)) {
		let signatures: ReadonlyArray<ts.Signature> | undefined;
		for (const t of type.types) {
			const sig = getCallSignaturesOfType(t);
			if (sig.length !== 0) {
				if (signatures !== undefined) return []; // if more than one type of the intersection has call signatures, none of them is useful for inference
				signatures = sig;
			}
		}
		return signatures === undefined ? [] : signatures;
	}
	return type.getCallSignatures();
}

export function getPropertyOfType(type: ts.Type, name: ts.__String) {
	if (!(name as string).startsWith("__"))
		return type.getProperty(name as string);
	return type.getProperties().find((s) => s.escapedName === name);
}

export function getWellKnownSymbolPropertyOfType(
	type: ts.Type,
	wellKnownSymbolName: string,
	checker: ts.TypeChecker
) {
	const prefix = "__@" + wellKnownSymbolName;
	for (const prop of type.getProperties()) {
		if (!prop.name.startsWith(prefix)) continue;
		const globalSymbol = checker.getApparentType(
			checker.getTypeAtLocation(
				(<ts.ComputedPropertyName>(
					(<ts.NamedDeclaration>prop.valueDeclaration).name
				)).expression
			)
		).symbol;
		if (
			prop.escapedName ===
			getPropertyNameOfWellKnownSymbol(
				checker,
				globalSymbol,
				wellKnownSymbolName
			)
		)
			return prop;
	}
	return;
}

function getPropertyNameOfWellKnownSymbol(
	checker: ts.TypeChecker,
	symbolConstructor: ts.Symbol | undefined,
	symbolName: string
) {
	const knownSymbol =
		symbolConstructor &&
		checker
			.getTypeOfSymbolAtLocation(
				symbolConstructor,
				(symbolConstructor as any).valueDeclaration
			)
			.getProperty(symbolName);
	const knownSymbolType =
		knownSymbol &&
		checker.getTypeOfSymbolAtLocation(
			knownSymbol,
			(knownSymbol as any).valueDeclaration
		);
	if (knownSymbolType && isUniqueESSymbolType(knownSymbolType))
		return knownSymbolType.escapedName;
	return <ts.__String>("__@" + symbolName);
}
