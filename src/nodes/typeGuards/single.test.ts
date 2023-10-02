import ts from "typescript";
import { describe, expect, it } from "vitest";

import { createNode } from "../../test/utils";
import { isTsVersionAtLeast } from "../../utils";
import {
	isAbstractKeyword,
	isAccessorKeyword,
	isAnyKeyword,
	isAssertKeyword,
	isAsyncKeyword,
	isConstKeyword,
	isDeclareKeyword,
	isDefaultKeyword,
	isDotToken,
	isEndOfFileToken,
	isEqualsToken,
	isExportKeyword,
	isFalseKeyword,
	isFalseLiteral,
	isImportExpression,
	isImportKeyword,
	isInKeyword,
	isJSDocText,
	isNeverKeyword,
	isNullKeyword,
	isNullLiteral,
	isNumberKeyword,
	isObjectKeyword,
	isOutKeyword,
	isOverrideKeyword,
	isPrivateKeyword,
	isProtectedKeyword,
	isPublicKeyword,
	isReadonlyKeyword,
	isStaticKeyword,
	isStringKeyword,
	isSuperExpression,
	isSuperKeyword,
	isSymbolKeyword,
	isThisKeyword,
	isTrueKeyword,
	isUndefinedKeyword,
	isUnknownKeyword,
	isVoidKeyword,
} from "./single";

describe("isAbstractKeyword", () => {
	it.each([
		[false, ts.factory.createModifier(ts.SyntaxKind.ReadonlyKeyword)],
		[true, ts.factory.createModifier(ts.SyntaxKind.AbstractKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isAbstractKeyword(createNode(code))).toBe(expected);
	});
});

if (isTsVersionAtLeast(4, 9)) {
	describe("isAccessorKeyword", () => {
		it.each([
			[false, ts.factory.createModifier(ts.SyntaxKind.AbstractKeyword)],
			[true, ts.factory.createModifier(ts.SyntaxKind.AccessorKeyword)],
		])("returns %j when given %s", (expected, code) => {
			expect(isAccessorKeyword(createNode(code))).toBe(expected);
		});
	});
}

describe("isAnyKeyword", () => {
	it.each([
		[false, ts.factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword)],
		[true, ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isAnyKeyword(createNode(code))).toBe(expected);
	});
});

if (isTsVersionAtLeast(4, 5)) {
	describe("isAssertKeyword", () => {
		it.each([
			[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
			[true, ts.factory.createToken(ts.SyntaxKind.AssertKeyword)],
		])("returns %j when given %s", (expected, code) => {
			expect(isAssertKeyword(createNode(code))).toBe(expected);
		});
	});
}

describe("isAsyncKeyword", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.AsyncKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isAsyncKeyword(createNode(code))).toBe(expected);
	});
});

describe("isConstKeyword", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.ConstKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isConstKeyword(createNode(code))).toBe(expected);
	});
});

describe("isDeclareKeyword", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.DeclareKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isDeclareKeyword(createNode(code))).toBe(expected);
	});
});

describe("isDefaultKeyword", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.DefaultKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isDefaultKeyword(createNode(code))).toBe(expected);
	});
});

describe("isDotToken", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.DotToken)],
	])("returns %j when given %s", (expected, code) => {
		expect(isDotToken(createNode(code))).toBe(expected);
	});
});

describe("isEndOfFileToken", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.EndOfFileToken)],
	])("returns %j when given %s", (expected, code) => {
		expect(isEndOfFileToken(createNode(code))).toBe(expected);
	});
});

describe("isEqualsToken", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.EqualsToken)],
	])("returns %j when given %s", (expected, code) => {
		expect(isEqualsToken(createNode(code))).toBe(expected);
	});
});

describe("isExportKeyword", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isExportKeyword(createNode(code))).toBe(expected);
	});
});

describe("isFalseKeyword", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.FalseKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isFalseKeyword(createNode(code))).toBe(expected);
	});
});

describe("isFalseLiteral", () => {
	it.each([
		[false, ts.factory.createTrue()],
		[true, ts.factory.createFalse()],
	])("returns %j when given %s", (expected, code) => {
		expect(isFalseLiteral(createNode(code))).toBe(expected);
	});
});

describe("isImportExpression", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.ImportKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isImportExpression(createNode(code))).toBe(expected);
	});
});

describe("isImportKeyword", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.ImportKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isImportKeyword(createNode(code))).toBe(expected);
	});
});

describe("isInKeyword", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.InKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isInKeyword(createNode(code))).toBe(expected);
	});
});

if (isTsVersionAtLeast(4, 3)) {
	describe("isJSDocText", () => {
		it.each([
			[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
			[true, ts.factory.createJSDocText("")],
		])("returns %j when given %s", (expected, code) => {
			expect(isJSDocText(createNode(code))).toBe(expected);
		});
	});
}

describe("isNeverKeyword", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.NeverKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isNeverKeyword(createNode(code))).toBe(expected);
	});
});

describe("isNullKeyword", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.NullKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isNullKeyword(createNode(code))).toBe(expected);
	});
});

describe("isNullLiteral", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createNull()],
	])("returns %j when given %s", (expected, code) => {
		expect(isNullLiteral(createNode(code))).toBe(expected);
	});
});

describe("isNumberKeyword", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.NumberKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isNumberKeyword(createNode(code))).toBe(expected);
	});
});

describe("isObjectKeyword", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.ObjectKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isObjectKeyword(createNode(code))).toBe(expected);
	});
});

if (isTsVersionAtLeast(4, 7)) {
	describe("isOutKeyword", () => {
		it.each([
			[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
			[true, ts.factory.createToken(ts.SyntaxKind.OutKeyword)],
		])("returns %j when given %s", (expected, code) => {
			expect(isOutKeyword(createNode(code))).toBe(expected);
		});
	});
}

if (isTsVersionAtLeast(4, 3)) {
	describe("isOverrideKeyword", () => {
		it.each([
			[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
			[true, ts.factory.createToken(ts.SyntaxKind.OverrideKeyword)],
		])("returns %j when given %s", (expected, code) => {
			expect(isOverrideKeyword(createNode(code))).toBe(expected);
		});
	});
}

describe("isPrivateKeyword", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.PrivateKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isPrivateKeyword(createNode(code))).toBe(expected);
	});
});

describe("isProtectedKeyword", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.ProtectedKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isProtectedKeyword(createNode(code))).toBe(expected);
	});
});

describe("isPublicKeyword", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.PublicKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isPublicKeyword(createNode(code))).toBe(expected);
	});
});

describe("isReadonlyKeyword", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.ReadonlyKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isReadonlyKeyword(createNode(code))).toBe(expected);
	});
});

describe("isStaticKeyword", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.StaticKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isStaticKeyword(createNode(code))).toBe(expected);
	});
});

describe("isStringKeyword", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.StringKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isStringKeyword(createNode(code))).toBe(expected);
	});
});

describe("isSuperExpression", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createSuper()],
	])("returns %j when given %s", (expected, code) => {
		expect(isSuperExpression(createNode(code))).toBe(expected);
	});
});

describe("isSuperKeyword", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.SuperKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isSuperKeyword(createNode(code))).toBe(expected);
	});
});

describe("isSymbolKeyword", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.SymbolKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isSymbolKeyword(createNode(code))).toBe(expected);
	});
});

describe("isThisKeyword", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.ThisKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isThisKeyword(createNode(code))).toBe(expected);
	});
});

describe("isTrueKeyword", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.TrueKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isTrueKeyword(createNode(code))).toBe(expected);
	});
});

describe("isUndefinedKeyword", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.UndefinedKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isUndefinedKeyword(createNode(code))).toBe(expected);
	});
});

describe("isUnknownKeyword", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.UnknownKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isUnknownKeyword(createNode(code))).toBe(expected);
	});
});

describe("isVoidKeyword", () => {
	it.each([
		[false, ts.factory.createToken(ts.SyntaxKind.AbstractKeyword)],
		[true, ts.factory.createToken(ts.SyntaxKind.VoidKeyword)],
	])("returns %j when given %s", (expected, code) => {
		expect(isVoidKeyword(createNode(code))).toBe(expected);
	});
});
