import * as ts from "typescript";

export function isAbstractKeyword(node: ts.Node): node is ts.AbstractKeyword {
	return node.kind === ts.SyntaxKind.AbstractKeyword;
}
export function isAccessorKeyword(node: ts.Node): node is ts.AccessorKeyword {
	return node.kind === ts.SyntaxKind.AccessorKeyword;
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
export function isFalseLiteral(node: ts.Node): node is ts.FalseLiteral {
	return node.kind === ts.SyntaxKind.FalseKeyword;
}
export function isImportExpression(node: ts.Node): node is ts.ImportExpression {
	return node.kind === ts.SyntaxKind.ImportKeyword;
}
export function isInKeyword(node: ts.Node): node is ts.InKeyword {
	return node.kind === ts.SyntaxKind.InKeyword;
}
export function isInputFiles(node: ts.Node): node is ts.InputFiles {
	return node.kind === ts.SyntaxKind.InputFiles;
}
export function isJSDocText(node: ts.Node): node is ts.JSDocText {
	return node.kind === ts.SyntaxKind.JSDocText;
}
export function isJsonMinusNumericLiteral(
	node: ts.Node
): node is ts.JsonMinusNumericLiteral {
	return node.kind === ts.SyntaxKind.PrefixUnaryExpression;
}
export function isNullLiteral(node: ts.Node): node is ts.NullLiteral {
	return node.kind === ts.SyntaxKind.NullKeyword;
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
export function isSuperExpression(node: ts.Node): node is ts.SuperExpression {
	return node.kind === ts.SyntaxKind.SuperKeyword;
}
export function isSyntaxList(node: ts.Node): node is ts.SyntaxList {
	return node.kind === ts.SyntaxKind.SyntaxList;
}
export function isThisExpression(node: ts.Node): node is ts.ThisExpression {
	return node.kind === ts.SyntaxKind.ThisKeyword;
}
export function isTrueLiteral(node: ts.Node): node is ts.TrueLiteral {
	return node.kind === ts.SyntaxKind.TrueKeyword;
}
export function isUnparsedPrologue(node: ts.Node): node is ts.UnparsedPrologue {
	return node.kind === ts.SyntaxKind.UnparsedPrologue;
}
export function isUnparsedSyntheticReference(
	node: ts.Node
): node is ts.UnparsedSyntheticReference {
	return node.kind === ts.SyntaxKind.UnparsedSyntheticReference;
}
