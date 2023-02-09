// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";

import {
	isIntersectionType,
	isUnionType,
	isUniqueESSymbolType,
} from "./typeGuards.js";

export function getCallSignaturesOfType(
	type: ts.Type
): readonly ts.Signature[] {
	if (isUnionType(type)) {
		const signatures = [];
		for (const subType of type.types) {
			signatures.push(...getCallSignaturesOfType(subType));
		}
		return signatures;
	}
	if (isIntersectionType(type)) {
		let signatures: readonly ts.Signature[] | undefined;
		for (const subType of type.types) {
			const sig = getCallSignaturesOfType(subType);
			if (sig.length !== 0) {
				if (signatures !== undefined) return []; // if more than one type of the intersection has call signatures, none of them is useful for inference
				signatures = sig;
			}
		}
		return signatures === undefined ? [] : signatures;
	}
	return type.getCallSignatures();
}

export function getPropertyOfType(
	type: ts.Type,
	name: ts.__String
): ts.Symbol | undefined {
	if (!(name as string).startsWith("__"))
		return type.getProperty(name as string);
	return type.getProperties().find((s) => s.escapedName === name);
}

export function getWellKnownSymbolPropertyOfType(
	type: ts.Type,
	wellKnownSymbolName: string,
	typeChecker: ts.TypeChecker
): ts.Symbol | undefined {
	const prefix = "__@" + wellKnownSymbolName;

	for (const prop of type.getProperties()) {
		if (!prop.name.startsWith(prefix)) continue;

		const globalSymbol = typeChecker.getApparentType(
			typeChecker.getTypeAtLocation(
				(
					(prop.valueDeclaration as ts.NamedDeclaration)
						.name as ts.ComputedPropertyName
				).expression
			)
		).symbol;

		if (
			prop.escapedName ===
			getPropertyNameOfWellKnownSymbol(
				typeChecker,
				globalSymbol,
				wellKnownSymbolName
			)
		) {
			return prop;
		}
	}

	return undefined;
}

function getPropertyNameOfWellKnownSymbol(
	typeChecker: ts.TypeChecker,
	symbolConstructor: ts.Symbol | undefined,
	symbolName: string
) {
	const knownSymbol =
		symbolConstructor &&
		typeChecker
			.getTypeOfSymbolAtLocation(
				symbolConstructor,
				// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
				(symbolConstructor as any).valueDeclaration
			)
			.getProperty(symbolName);
	const knownSymbolType =
		knownSymbol &&
		typeChecker.getTypeOfSymbolAtLocation(
			knownSymbol,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
			(knownSymbol as any).valueDeclaration
		);
	if (knownSymbolType && isUniqueESSymbolType(knownSymbolType))
		return knownSymbolType.escapedName;
	return ("__@" + symbolName) as ts.__String;
}
