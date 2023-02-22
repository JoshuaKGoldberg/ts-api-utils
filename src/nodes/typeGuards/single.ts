import * as ts from "typescript";

/**
 * A node that represents the any keyword.
 *
 * @category Node Types
 */
export type AnyKeyword = ts.KeywordToken<ts.SyntaxKind.AnyKeyword>;

/**
 * A node that represents the bigint keyword.
 *
 * @category Node Types
 */
export type BigIntKeyword = ts.KeywordToken<ts.SyntaxKind.BigIntKeyword>;

/**
 * A node that represents the boolean keyword.
 *
 * @category Node Types
 */
export type BooleanKeyword = ts.KeywordToken<ts.SyntaxKind.BooleanKeyword>;

/**
 * A node that represents the false keyword.
 *
 * @category Node Types
 */
export type FalseKeyword = ts.KeywordToken<ts.SyntaxKind.FalseKeyword>;

/**
 * A node that represents the import keyword.
 *
 * @category Node Types
 */
export type ImportKeyword = ts.KeywordToken<ts.SyntaxKind.ImportKeyword>;

/**
 * A node that represents the never keyword.
 *
 * @category Node Types
 */
export type NeverKeyword = ts.KeywordToken<ts.SyntaxKind.NeverKeyword>;

/**
 * A node that represents the null keyword.
 *
 * @category Node Types
 */
export type NullKeyword = ts.KeywordToken<ts.SyntaxKind.NullKeyword>;

/**
 * A node that represents the number keyword.
 *
 * @category Node Types
 */
export type NumberKeyword = ts.KeywordToken<ts.SyntaxKind.NumberKeyword>;

/**
 * A node that represents the object keyword.
 *
 * @category Node Types
 */
export type ObjectKeyword = ts.KeywordToken<ts.SyntaxKind.ObjectKeyword>;

/**
 * A node that represents the string keyword.
 *
 * @category Node Types
 */
export type StringKeyword = ts.KeywordToken<ts.SyntaxKind.StringKeyword>;

/**
 * A node that represents the super keyword.
 *
 * @category Node Types
 */
export type SuperKeyword = ts.KeywordToken<ts.SyntaxKind.SuperKeyword>;

/**
 * A node that represents the symbol keyword.
 *
 * @category Node Types
 */
export type SymbolKeyword = ts.KeywordToken<ts.SyntaxKind.SymbolKeyword>;

/**
 * A node that represents the this keyword.
 *
 * @category Node Types
 */
export type ThisKeyword = ts.KeywordToken<ts.SyntaxKind.ThisKeyword>;

/**
 * A node that represents the true keyword.
 *
 * @category Node Types
 */
export type TrueKeyword = ts.KeywordToken<ts.SyntaxKind.TrueKeyword>;

/**
 * A node that represents the undefined keyword.
 *
 * @category Node Types
 */
export type UndefinedKeyword = ts.KeywordToken<ts.SyntaxKind.UndefinedKeyword>;

/**
 * A node that represents the unknown keyword.
 *
 * @category Node Types
 */
export type UnknownKeyword = ts.KeywordToken<ts.SyntaxKind.UnknownKeyword>;

/**
 * A node that represents the void keyword.
 *
 * @category Node Types
 */
export type VoidKeyword = ts.KeywordToken<ts.SyntaxKind.VoidKeyword>;

/**
 * Test if a node is an `AbstractKeyword`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be an `AbstractKeyword`.
 */
export function isAbstractKeyword(node: ts.Node): node is ts.AbstractKeyword {
	return node.kind === ts.SyntaxKind.AbstractKeyword;
}

/**
 * Test if a node is an `AccessorKeyword`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be an `AccessorKeyword`.
 */
export function isAccessorKeyword(node: ts.Node): node is ts.AccessorKeyword {
	return node.kind === ts.SyntaxKind.AccessorKeyword;
}

/**
 * Test if a node is an {@link AnyKeyword}.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be an {@link AnyKeyword}.
 */
export function isAnyKeyword(node: ts.Node): node is AnyKeyword {
	return node.kind === ts.SyntaxKind.AnyKeyword;
}

/**
 * Test if a node is an `AssertKeyword`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be an `AssertKeyword`.
 */
export function isAssertKeyword(node: ts.Node): node is ts.AssertKeyword {
	return node.kind === ts.SyntaxKind.AssertKeyword;
}

/**
 * Test if a node is an `AssertsKeyword`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be an `AssertsKeyword`.
 */
export function isAssertsKeyword(node: ts.Node): node is ts.AssertsKeyword {
	return node.kind === ts.SyntaxKind.AssertsKeyword;
}

/**
 * Test if a node is an `AsyncKeyword`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be an `AsyncKeyword`.
 */
export function isAsyncKeyword(node: ts.Node): node is ts.AsyncKeyword {
	return node.kind === ts.SyntaxKind.AsyncKeyword;
}

/**
 * Test if a node is an `AwaitKeyword`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be an `AwaitKeyword`.
 */
export function isAwaitKeyword(node: ts.Node): node is ts.AwaitKeyword {
	return node.kind === ts.SyntaxKind.AwaitKeyword;
}

/**
 * Test if a node is a {@link BigIntKeyword}.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a {@link BigIntKeyword}.
 */
export function isBigIntKeyword(node: ts.Node): node is BigIntKeyword {
	return node.kind === ts.SyntaxKind.BigIntKeyword;
}

/**
 * Test if a node is a {@link BooleanKeyword}.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a {@link BooleanKeyword}.
 */
export function isBooleanKeyword(node: ts.Node): node is BooleanKeyword {
	return node.kind === ts.SyntaxKind.BooleanKeyword;
}

/**
 * Test if a node is a `ColonToken`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a `ColonToken`.
 */
export function isColonToken(node: ts.Node): node is ts.ColonToken {
	return node.kind === ts.SyntaxKind.ColonToken;
}

/**
 * Test if a node is a `ConstKeyword`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a `ConstKeyword`.
 */
export function isConstKeyword(node: ts.Node): node is ts.ConstKeyword {
	return node.kind === ts.SyntaxKind.ConstKeyword;
}

/**
 * Test if a node is a `DeclareKeyword`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a `DeclareKeyword`.
 */
export function isDeclareKeyword(node: ts.Node): node is ts.DeclareKeyword {
	return node.kind === ts.SyntaxKind.DeclareKeyword;
}

/**
 * Test if a node is a `DefaultKeyword`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a `DefaultKeyword`.
 */
export function isDefaultKeyword(node: ts.Node): node is ts.DefaultKeyword {
	return node.kind === ts.SyntaxKind.DefaultKeyword;
}

/**
 * Test if a node is a `DotToken`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a `DotToken`.
 */
export function isDotToken(node: ts.Node): node is ts.DotToken {
	return node.kind === ts.SyntaxKind.DotToken;
}

/**
 * Test if a node is an `EndOfFileToken`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be an `EndOfFileToken`.
 */
export function isEndOfFileToken(node: ts.Node): node is ts.EndOfFileToken {
	return node.kind === ts.SyntaxKind.EndOfFileToken;
}

/**
 * Test if a node is an `EqualsGreaterThanToken`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be an `EqualsGreaterThanToken`.
 */
export function isEqualsGreaterThanToken(
	node: ts.Node
): node is ts.EqualsGreaterThanToken {
	return node.kind === ts.SyntaxKind.EqualsGreaterThanToken;
}

/**
 * Test if a node is an `EqualsToken`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be an `EqualsToken`.
 */
export function isEqualsToken(node: ts.Node): node is ts.EqualsToken {
	return node.kind === ts.SyntaxKind.EqualsToken;
}

/**
 * Test if a node is an `ExclamationToken`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be an `ExclamationToken`.
 */
export function isExclamationToken(node: ts.Node): node is ts.ExclamationToken {
	return node.kind === ts.SyntaxKind.ExclamationToken;
}

/**
 * Test if a node is an `ExportKeyword`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be an `ExportKeyword`.
 */
export function isExportKeyword(node: ts.Node): node is ts.ExportKeyword {
	return node.kind === ts.SyntaxKind.ExportKeyword;
}

/**
 * Test if a node is a {@link FalseKeyword}.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a {@link FalseKeyword}.
 */
export function isFalseKeyword(node: ts.Node): node is FalseKeyword {
	return node.kind === ts.SyntaxKind.FalseKeyword;
}

/**
 * Test if a node is a `FalseLiteral`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a `FalseLiteral`.
 */
export function isFalseLiteral(node: ts.Node): node is ts.FalseLiteral {
	return node.kind === ts.SyntaxKind.FalseKeyword;
}

/**
 * Test if a node is an `ImportExpression`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be an `ImportExpression`.
 */
export function isImportExpression(node: ts.Node): node is ts.ImportExpression {
	return node.kind === ts.SyntaxKind.ImportKeyword;
}

/**
 * Test if a node is an {@link ImportKeyword}.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be an {@link ImportKeyword}.
 */
export function isImportKeyword(node: ts.Node): node is ImportKeyword {
	return node.kind === ts.SyntaxKind.ImportKeyword;
}

/**
 * Test if a node is an `InKeyword`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be an `InKeyword`.
 */
export function isInKeyword(node: ts.Node): node is ts.InKeyword {
	return node.kind === ts.SyntaxKind.InKeyword;
}

/**
 * Test if a node is an `InputFiles`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be an `InputFiles`.
 */
export function isInputFiles(node: ts.Node): node is ts.InputFiles {
	return node.kind === ts.SyntaxKind.InputFiles;
}

/**
 * Test if a node is a `JSDocText`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a `JSDocText`.
 */
export function isJSDocText(node: ts.Node): node is ts.JSDocText {
	return node.kind === ts.SyntaxKind.JSDocText;
}

/**
 * Test if a node is a `JsonMinusNumericLiteral`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a `JsonMinusNumericLiteral`.
 */
export function isJsonMinusNumericLiteral(
	node: ts.Node
): node is ts.JsonMinusNumericLiteral {
	return node.kind === ts.SyntaxKind.PrefixUnaryExpression;
}

/**
 * Test if a node is a {@link NeverKeyword}.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a {@link NeverKeyword}.
 */
export function isNeverKeyword(node: ts.Node): node is NeverKeyword {
	return node.kind === ts.SyntaxKind.NeverKeyword;
}

/**
 * Test if a node is a {@link NullKeyword}.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a {@link NullKeyword}.
 */
export function isNullKeyword(node: ts.Node): node is NullKeyword {
	return node.kind === ts.SyntaxKind.NullKeyword;
}

/**
 * Test if a node is a `NullLiteral`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a `NullLiteral`.
 */
export function isNullLiteral(node: ts.Node): node is ts.NullLiteral {
	return node.kind === ts.SyntaxKind.NullKeyword;
}

/**
 * Test if a node is a {@link NumberKeyword}.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a {@link NumberKeyword}.
 */
export function isNumberKeyword(node: ts.Node): node is NumberKeyword {
	return node.kind === ts.SyntaxKind.NumberKeyword;
}

/**
 * Test if a node is an {@link ObjectKeyword}.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be an {@link ObjectKeyword}.
 */
export function isObjectKeyword(node: ts.Node): node is ObjectKeyword {
	return node.kind === ts.SyntaxKind.ObjectKeyword;
}

/**
 * Test if a node is an `OutKeyword`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be an `OutKeyword`.
 */
export function isOutKeyword(node: ts.Node): node is ts.OutKeyword {
	return node.kind === ts.SyntaxKind.OutKeyword;
}

/**
 * Test if a node is an `OverrideKeyword`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be an `OverrideKeyword`.
 */
export function isOverrideKeyword(node: ts.Node): node is ts.OverrideKeyword {
	return node.kind === ts.SyntaxKind.OverrideKeyword;
}

/**
 * Test if a node is a `PrivateKeyword`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a `PrivateKeyword`.
 */
export function isPrivateKeyword(node: ts.Node): node is ts.PrivateKeyword {
	return node.kind === ts.SyntaxKind.PrivateKeyword;
}

/**
 * Test if a node is a `ProtectedKeyword`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a `ProtectedKeyword`.
 */
export function isProtectedKeyword(node: ts.Node): node is ts.ProtectedKeyword {
	return node.kind === ts.SyntaxKind.ProtectedKeyword;
}

/**
 * Test if a node is a `PublicKeyword`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a `PublicKeyword`.
 */
export function isPublicKeyword(node: ts.Node): node is ts.PublicKeyword {
	return node.kind === ts.SyntaxKind.PublicKeyword;
}

/**
 * Test if a node is a `QuestionDotToken`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a `QuestionDotToken`.
 */
export function isQuestionDotToken(node: ts.Node): node is ts.QuestionDotToken {
	return node.kind === ts.SyntaxKind.QuestionDotToken;
}

/**
 * Test if a node is a `QuestionToken`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a `QuestionToken`.
 */
export function isQuestionToken(node: ts.Node): node is ts.QuestionToken {
	return node.kind === ts.SyntaxKind.QuestionToken;
}

/**
 * Test if a node is a `ReadonlyKeyword`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a `ReadonlyKeyword`.
 */
export function isReadonlyKeyword(node: ts.Node): node is ts.ReadonlyKeyword {
	return node.kind === ts.SyntaxKind.ReadonlyKeyword;
}

/**
 * Test if a node is a `StaticKeyword`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a `StaticKeyword`.
 */
export function isStaticKeyword(node: ts.Node): node is ts.StaticKeyword {
	return node.kind === ts.SyntaxKind.StaticKeyword;
}

/**
 * Test if a node is a {@link StringKeyword}.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a {@link StringKeyword}.
 */
export function isStringKeyword(node: ts.Node): node is StringKeyword {
	return node.kind === ts.SyntaxKind.StringKeyword;
}

/**
 * Test if a node is a `SuperExpression`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a `SuperExpression`.
 */
export function isSuperExpression(node: ts.Node): node is ts.SuperExpression {
	return node.kind === ts.SyntaxKind.SuperKeyword;
}

/**
 * Test if a node is a {@link SuperKeyword}.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a {@link SuperKeyword}.
 */
export function isSuperKeyword(node: ts.Node): node is SuperKeyword {
	return node.kind === ts.SyntaxKind.SuperKeyword;
}

/**
 * Test if a node is a {@link SymbolKeyword}.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a {@link SymbolKeyword}.
 */
export function isSymbolKeyword(node: ts.Node): node is SymbolKeyword {
	return node.kind === ts.SyntaxKind.SymbolKeyword;
}

/**
 * Test if a node is a `SyntaxList`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a `SyntaxList`.
 */
export function isSyntaxList(node: ts.Node): node is ts.SyntaxList {
	return node.kind === ts.SyntaxKind.SyntaxList;
}

/**
 * Test if a node is a `ThisExpression`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a `ThisExpression`.
 */
export function isThisExpression(node: ts.Node): node is ts.ThisExpression {
	return node.kind === ts.SyntaxKind.ThisKeyword;
}

/**
 * Test if a node is a {@link ThisKeyword}.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a {@link ThisKeyword}.
 */
export function isThisKeyword(node: ts.Node): node is ThisKeyword {
	return node.kind === ts.SyntaxKind.ThisKeyword;
}

/**
 * Test if a node is a {@link TrueKeyword}.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a {@link TrueKeyword}.
 */
export function isTrueKeyword(node: ts.Node): node is TrueKeyword {
	return node.kind === ts.SyntaxKind.TrueKeyword;
}

/**
 * Test if a node is a `TrueLiteral`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a `TrueLiteral`.
 */
export function isTrueLiteral(node: ts.Node): node is ts.TrueLiteral {
	return node.kind === ts.SyntaxKind.TrueKeyword;
}

/**
 * Test if a node is an {@link UndefinedKeyword}.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be an {@link UndefinedKeyword}.
 */
export function isUndefinedKeyword(node: ts.Node): node is UndefinedKeyword {
	return node.kind === ts.SyntaxKind.UndefinedKeyword;
}

/**
 * Test if a node is an {@link UnknownKeyword}.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be an {@link UnknownKeyword}.
 */
export function isUnknownKeyword(node: ts.Node): node is UnknownKeyword {
	return node.kind === ts.SyntaxKind.UnknownKeyword;
}

/**
 * Test if a node is an `UnparsedPrologue`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be an `UnparsedPrologue`.
 */
export function isUnparsedPrologue(node: ts.Node): node is ts.UnparsedPrologue {
	return node.kind === ts.SyntaxKind.UnparsedPrologue;
}

/**
 * Test if a node is an `UnparsedSyntheticReference`.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be an `UnparsedSyntheticReference`.
 */
export function isUnparsedSyntheticReference(
	node: ts.Node
): node is ts.UnparsedSyntheticReference {
	return node.kind === ts.SyntaxKind.UnparsedSyntheticReference;
}

/**
 * Test if a node is a {@link VoidKeyword}.
 *
 * @category Nodes - Type Guards
 * @returns Whether the given node appears to be a {@link VoidKeyword}.
 */
export function isVoidKeyword(node: ts.Node): node is VoidKeyword {
	return node.kind === ts.SyntaxKind.VoidKeyword;
}
