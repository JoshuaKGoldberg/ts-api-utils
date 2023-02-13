import * as ts from "typescript";

export type AnyKeyword = ts.KeywordToken<ts.SyntaxKind.AnyKeyword>;
export type BigIntKeyword = ts.KeywordToken<ts.SyntaxKind.BigIntKeyword>;
export type BooleanKeyword = ts.KeywordToken<ts.SyntaxKind.BooleanKeyword>;
export type FalseKeyword = ts.KeywordToken<ts.SyntaxKind.FalseKeyword>;
export type ImportKeyword = ts.KeywordToken<ts.SyntaxKind.ImportKeyword>;
export type NeverKeyword = ts.KeywordToken<ts.SyntaxKind.NeverKeyword>;
export type NullKeyword = ts.KeywordToken<ts.SyntaxKind.NullKeyword>;
export type NumberKeyword = ts.KeywordToken<ts.SyntaxKind.NumberKeyword>;
export type ObjectKeyword = ts.KeywordToken<ts.SyntaxKind.ObjectKeyword>;
export type StringKeyword = ts.KeywordToken<ts.SyntaxKind.StringKeyword>;
export type SuperKeyword = ts.KeywordToken<ts.SyntaxKind.SuperKeyword>;
export type SymbolKeyword = ts.KeywordToken<ts.SyntaxKind.SymbolKeyword>;
export type ThisKeyword = ts.KeywordToken<ts.SyntaxKind.ThisKeyword>;
export type TrueKeyword = ts.KeywordToken<ts.SyntaxKind.TrueKeyword>;
export type UndefinedKeyword = ts.KeywordToken<ts.SyntaxKind.UndefinedKeyword>;
export type UnknownKeyword = ts.KeywordToken<ts.SyntaxKind.UnknownKeyword>;
export type VoidKeyword = ts.KeywordToken<ts.SyntaxKind.VoidKeyword>;

export function isAbstractKeyword(node: ts.Node): node is ts.AbstractKeyword {
	return node.kind === ts.SyntaxKind.AbstractKeyword;
}

export function isAccessorKeyword(node: ts.Node): node is ts.AccessorKeyword {
	return node.kind === ts.SyntaxKind.AccessorKeyword;
}

export function isAnyKeyword(node: ts.Node): node is AnyKeyword {
	return node.kind === ts.SyntaxKind.AnyKeyword;
}

export function isAssertKeyword(node: ts.Node): node is ts.AssertKeyword {
	return node.kind === ts.SyntaxKind.AssertKeyword;
}

export function isAssertsKeyword(node: ts.Node): node is ts.AssertsKeyword {
	return node.kind === ts.SyntaxKind.AssertsKeyword;
}

export function isAsyncKeyword(node: ts.Node): node is ts.AsyncKeyword {
	return node.kind === ts.SyntaxKind.AsyncKeyword;
}

export function isAwaitKeyword(node: ts.Node): node is ts.AwaitKeyword {
	return node.kind === ts.SyntaxKind.AwaitKeyword;
}

export function isBigIntKeyword(node: ts.Node): node is BigIntKeyword {
	return node.kind === ts.SyntaxKind.BigIntKeyword;
}

export function isBooleanKeyword(node: ts.Node): node is BooleanKeyword {
	return node.kind === ts.SyntaxKind.BooleanKeyword;
}

export function isColonToken(node: ts.Node): node is ts.ColonToken {
	return node.kind === ts.SyntaxKind.ColonToken;
}

export function isConstKeyword(node: ts.Node): node is ts.ConstKeyword {
	return node.kind === ts.SyntaxKind.ConstKeyword;
}

export function isDeclareKeyword(node: ts.Node): node is ts.DeclareKeyword {
	return node.kind === ts.SyntaxKind.DeclareKeyword;
}

export function isDefaultKeyword(node: ts.Node): node is ts.DefaultKeyword {
	return node.kind === ts.SyntaxKind.DefaultKeyword;
}

export function isDotToken(node: ts.Node): node is ts.DotToken {
	return node.kind === ts.SyntaxKind.DotToken;
}

export function isEndOfFileToken(node: ts.Node): node is ts.EndOfFileToken {
	return node.kind === ts.SyntaxKind.EndOfFileToken;
}

export function isEqualsGreaterThanToken(
	node: ts.Node
): node is ts.EqualsGreaterThanToken {
	return node.kind === ts.SyntaxKind.EqualsGreaterThanToken;
}

export function isEqualsToken(node: ts.Node): node is ts.EqualsToken {
	return node.kind === ts.SyntaxKind.EqualsToken;
}

export function isExclamationToken(node: ts.Node): node is ts.ExclamationToken {
	return node.kind === ts.SyntaxKind.ExclamationToken;
}

export function isExportKeyword(node: ts.Node): node is ts.ExportKeyword {
	return node.kind === ts.SyntaxKind.ExportKeyword;
}

export function isFalseKeyword(node: ts.Node): node is FalseKeyword {
	return node.kind === ts.SyntaxKind.FalseKeyword;
}

export function isFalseLiteral(node: ts.Node): node is ts.FalseLiteral {
	return node.kind === ts.SyntaxKind.FalseKeyword;
}

export function isImportExpression(node: ts.Node): node is ts.ImportExpression {
	return node.kind === ts.SyntaxKind.ImportKeyword;
}

export function isImportKeyword(node: ts.Node): node is ImportKeyword {
	return node.kind === ts.SyntaxKind.ImportKeyword;
}

export function isInKeyword(node: ts.Node): node is ts.InKeyword {
	return node.kind === ts.SyntaxKind.InKeyword;
}

export function isJSDocText(node: ts.Node): node is ts.JSDocText {
	return node.kind === ts.SyntaxKind.JSDocText;
}

export function isJsonMinusNumericLiteral(
	node: ts.Node
): node is ts.JsonMinusNumericLiteral {
	return node.kind === ts.SyntaxKind.PrefixUnaryExpression;
}

export function isNeverKeyword(node: ts.Node): node is NeverKeyword {
	return node.kind === ts.SyntaxKind.NeverKeyword;
}

export function isNullKeyword(node: ts.Node): node is NullKeyword {
	return node.kind === ts.SyntaxKind.NullKeyword;
}

export function isNullLiteral(node: ts.Node): node is ts.NullLiteral {
	return node.kind === ts.SyntaxKind.NullKeyword;
}

export function isNumberKeyword(node: ts.Node): node is NumberKeyword {
	return node.kind === ts.SyntaxKind.NumberKeyword;
}

export function isObjectKeyword(node: ts.Node): node is ObjectKeyword {
	return node.kind === ts.SyntaxKind.ObjectKeyword;
}

export function isOutKeyword(node: ts.Node): node is ts.OutKeyword {
	return node.kind === ts.SyntaxKind.OutKeyword;
}

export function isOverrideKeyword(node: ts.Node): node is ts.OverrideKeyword {
	return node.kind === ts.SyntaxKind.OverrideKeyword;
}

export function isPrivateKeyword(node: ts.Node): node is ts.PrivateKeyword {
	return node.kind === ts.SyntaxKind.PrivateKeyword;
}

export function isProtectedKeyword(node: ts.Node): node is ts.ProtectedKeyword {
	return node.kind === ts.SyntaxKind.ProtectedKeyword;
}

export function isPublicKeyword(node: ts.Node): node is ts.PublicKeyword {
	return node.kind === ts.SyntaxKind.PublicKeyword;
}

export function isQuestionDotToken(node: ts.Node): node is ts.QuestionDotToken {
	return node.kind === ts.SyntaxKind.QuestionDotToken;
}

export function isQuestionToken(node: ts.Node): node is ts.QuestionToken {
	return node.kind === ts.SyntaxKind.QuestionToken;
}

export function isReadonlyKeyword(node: ts.Node): node is ts.ReadonlyKeyword {
	return node.kind === ts.SyntaxKind.ReadonlyKeyword;
}

export function isStaticKeyword(node: ts.Node): node is ts.StaticKeyword {
	return node.kind === ts.SyntaxKind.StaticKeyword;
}

export function isStringKeyword(node: ts.Node): node is StringKeyword {
	return node.kind === ts.SyntaxKind.StringKeyword;
}

export function isSuperExpression(node: ts.Node): node is ts.SuperExpression {
	return node.kind === ts.SyntaxKind.SuperKeyword;
}

export function isSuperKeyword(node: ts.Node): node is SuperKeyword {
	return node.kind === ts.SyntaxKind.SuperKeyword;
}

export function isSymbolKeyword(node: ts.Node): node is SymbolKeyword {
	return node.kind === ts.SyntaxKind.SymbolKeyword;
}

export function isSyntaxList(node: ts.Node): node is ts.SyntaxList {
	return node.kind === ts.SyntaxKind.SyntaxList;
}

export function isThisExpression(node: ts.Node): node is ts.ThisExpression {
	return node.kind === ts.SyntaxKind.ThisKeyword;
}

export function isThisKeyword(node: ts.Node): node is ThisKeyword {
	return node.kind === ts.SyntaxKind.ThisKeyword;
}

export function isTrueKeyword(node: ts.Node): node is TrueKeyword {
	return node.kind === ts.SyntaxKind.TrueKeyword;
}

export function isTrueLiteral(node: ts.Node): node is ts.TrueLiteral {
	return node.kind === ts.SyntaxKind.TrueKeyword;
}
