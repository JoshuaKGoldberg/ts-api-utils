// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";

import { isNamedDeclarationWithName } from "../nodes/typeGuards/index.js";
import {
	isIntersectionType,
	isUnionType,
	isUniqueESSymbolType,
} from "./typeGuards/index.js";

/**
 * Get the `CallSignatures` of the given type.
 *
 * @category Types - Getters
 *
 * @example
 * ```ts
 * declare const type: ts.Type;
 *
 * getCallSignaturesOfType(type);
 * ```
 */
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

/**
 * Get the property with the given name on the given type (if it exists).
 *
 * @category Types - Getters
 *
 * @example
 * ```ts
 * declare const property: ts.Symbol;
 * declare const type: ts.Type;
 *
 * getPropertyOfType(type, property.getEscapedName());
 * ```
 */
export function getPropertyOfType(
	type: ts.Type,
	name: ts.__String
): ts.Symbol | undefined {
	if (!(name as string).startsWith("__"))
		return type.getProperty(name as string);
	return type.getProperties().find((s) => s.escapedName === name);
}

/**
 * Retrieves a type symbol corresponding to a well-known string name.
 *
 * @category Types - Getters
 *
 * @example
 * ```ts
 * declare const type: ts.Type;
 * declare const typeChecker: ts.TypeChecker;
 *
 * getWellKnownSymbolPropertyOfType(type, "asyncIterator", typeChecker);
 * ```
 */
export function getWellKnownSymbolPropertyOfType(
	type: ts.Type,
	wellKnownSymbolName: string,
	typeChecker: ts.TypeChecker
): ts.Symbol | undefined {
	const prefix = "__@" + wellKnownSymbolName;

	for (const prop of type.getProperties()) {
		if (!prop.name.startsWith(prefix)) {
			continue;
		}

		const declaration = prop.valueDeclaration ?? prop.getDeclarations()![0];
		if (
			!isNamedDeclarationWithName(declaration) ||
			declaration.name === undefined ||
			!ts.isComputedPropertyName(declaration.name)
		) {
			continue;
		}

		const globalSymbol = typeChecker.getApparentType(
			typeChecker.getTypeAtLocation(declaration.name.expression)
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

/**
 * @internal
 */
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
