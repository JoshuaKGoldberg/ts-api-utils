import * as ts from "typescript";
import { describe, expect, it } from "vitest";

import {
	isModifierFlagSet,
	isNodeFlagSet,
	isObjectFlagSet,
	isSymbolFlagSet,
	isTransientSymbolLinksFlagSet,
	isTypeFlagSet,
} from "./flags";

describe("isModifierFlagSet", () => {
	it("checks declaration modifier flags", () => {
		const declaration = ts.factory.createClassDeclaration(
			[
				ts.factory.createModifier(ts.SyntaxKind.ExportKeyword),
				ts.factory.createModifier(ts.SyntaxKind.AbstractKeyword),
			],
			"Example",
			undefined,
			undefined,
			[],
		);

		expect(isModifierFlagSet(declaration, ts.ModifierFlags.Abstract)).toBe(
			true,
		);
		expect(isModifierFlagSet(declaration, ts.ModifierFlags.Export)).toBe(true);
		expect(isModifierFlagSet(declaration, ts.ModifierFlags.Async)).toBe(false);
	});
});

describe("isNodeFlagSet", () => {
	it("checks node flags", () => {
		const node = { flags: ts.NodeFlags.AwaitContext } as ts.Node;

		expect(isNodeFlagSet(node, ts.NodeFlags.AwaitContext)).toBe(true);
		expect(isNodeFlagSet(node, ts.NodeFlags.JavaScriptFile)).toBe(false);
	});
});

describe("isObjectFlagSet", () => {
	it("checks object type flags", () => {
		const objectType = {
			objectFlags: ts.ObjectFlags.Anonymous,
		} as ts.ObjectType;

		expect(isObjectFlagSet(objectType, ts.ObjectFlags.Anonymous)).toBe(true);
		expect(isObjectFlagSet(objectType, ts.ObjectFlags.Mapped)).toBe(false);
	});
});

describe("isSymbolFlagSet", () => {
	it("checks symbol flags", () => {
		const symbol = { flags: ts.SymbolFlags.Function } as ts.Symbol;

		expect(isSymbolFlagSet(symbol, ts.SymbolFlags.Function)).toBe(true);
		expect(isSymbolFlagSet(symbol, ts.SymbolFlags.Class)).toBe(false);
	});
});

describe("isTransientSymbolLinksFlagSet", () => {
	it("checks transient symbol link flags", () => {
		const links = {
			checkFlags: ts.CheckFlags.Readonly,
		} as ts.TransientSymbolLinks;
		const linksWithoutFlags = {
			checkFlags: 0 as ts.CheckFlags,
		} as ts.TransientSymbolLinks;

		expect(isTransientSymbolLinksFlagSet(links, ts.CheckFlags.Readonly)).toBe(
			true,
		);
		expect(
			isTransientSymbolLinksFlagSet(linksWithoutFlags, ts.CheckFlags.Readonly),
		).toBe(false);
	});
});

describe("isTypeFlagSet", () => {
	it("checks type flags", () => {
		const type = { flags: ts.TypeFlags.String } as ts.Type;

		expect(isTypeFlagSet(type, ts.TypeFlags.String)).toBe(true);
		expect(isTypeFlagSet(type, ts.TypeFlags.Number)).toBe(false);
	});
});
