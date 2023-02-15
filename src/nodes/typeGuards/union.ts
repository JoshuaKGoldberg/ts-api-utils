import * as ts from "typescript";

import {
	isJSDocNamespaceDeclaration,
	isJsxTagNamePropertyAccess,
	isNamespaceDeclaration,
	isPropertyAccessEntityNameExpression,
	isSuperElementAccessExpression,
	isSuperPropertyAccessExpression,
} from "./compound.js";
import {
	isAccessorKeyword,
	isEndOfFileToken,
	isFalseLiteral,
	isJSDocText,
	isJsonMinusNumericLiteral,
	isNullLiteral,
	isPrivateKeyword,
	isProtectedKeyword,
	isPublicKeyword,
	isReadonlyKeyword,
	isStaticKeyword,
	isThisExpression,
	isTrueLiteral,
} from "./single.js";

export function isAccessExpression(node: ts.Node): node is ts.AccessExpression {
	return (
		ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)
	);
}

export function isAccessibilityModifier(
	node: ts.Node
): node is ts.AccessibilityModifier {
	return (
		isPublicKeyword(node) || isPrivateKeyword(node) || isProtectedKeyword(node)
	);
}

export function isAccessorDeclaration(
	node: ts.Node
): node is ts.AccessorDeclaration {
	return ts.isGetAccessorDeclaration(node) || ts.isSetAccessorDeclaration(node);
}

export function isArrayBindingElement(
	node: ts.Node
): node is ts.ArrayBindingElement {
	return ts.isBindingElement(node) || ts.isOmittedExpression(node);
}

export function isArrayBindingOrAssignmentPattern(
	node: ts.Node
): node is ts.ArrayBindingOrAssignmentPattern {
	return ts.isArrayBindingPattern(node) || ts.isArrayLiteralExpression(node);
}

export function isAssignmentPattern(
	node: ts.Node
): node is ts.AssignmentPattern {
	return (
		ts.isObjectLiteralExpression(node) || ts.isArrayLiteralExpression(node)
	);
}

export function isBindingOrAssignmentElementRestIndicator(
	node: ts.Node
): node is ts.BindingOrAssignmentElementRestIndicator {
	return (
		ts.isDotDotDotToken(node) ||
		ts.isSpreadElement(node) ||
		ts.isSpreadAssignment(node)
	);
}

export function isBindingOrAssignmentElementTarget(
	node: ts.Node
): node is ts.BindingOrAssignmentElementTarget {
	return (
		isBindingOrAssignmentPattern(node) ||
		ts.isIdentifier(node) ||
		ts.isPropertyAccessExpression(node) ||
		ts.isElementAccessExpression(node) ||
		ts.isOmittedExpression(node)
	);
}

export function isBindingOrAssignmentPattern(
	node: ts.Node
): node is ts.BindingOrAssignmentPattern {
	return (
		isObjectBindingOrAssignmentPattern(node) ||
		isArrayBindingOrAssignmentPattern(node)
	);
}

export function isBindingPattern(node: ts.Node): node is ts.BindingPattern {
	return ts.isObjectBindingPattern(node) || ts.isArrayBindingPattern(node);
}

export function isBlockLike(node: ts.Node): node is ts.BlockLike {
	return (
		ts.isSourceFile(node) ||
		ts.isBlock(node) ||
		ts.isModuleBlock(node) ||
		ts.isCaseOrDefaultClause(node)
	);
}

export function isBooleanLiteral(node: ts.Node): node is ts.BooleanLiteral {
	return isTrueLiteral(node) || isFalseLiteral(node);
}

export function isClassLikeDeclaration(
	node: ts.Node
): node is ts.ClassLikeDeclaration {
	return ts.isClassDeclaration(node) || ts.isClassExpression(node);
}

export function isClassMemberModifier(
	node: ts.Node
): node is ts.ClassMemberModifier {
	return (
		isAccessibilityModifier(node) ||
		isReadonlyKeyword(node) ||
		isStaticKeyword(node) ||
		isAccessorKeyword(node)
	);
}

export function isDeclarationName(node: ts.Node): node is ts.DeclarationName {
	return (
		ts.isIdentifier(node) ||
		ts.isPrivateIdentifier(node) ||
		ts.isStringLiteralLike(node) ||
		ts.isNumericLiteral(node) ||
		ts.isComputedPropertyName(node) ||
		ts.isElementAccessExpression(node) ||
		isBindingPattern(node) ||
		isEntityNameExpression(node)
	);
}

export function isDeclarationWithTypeParameterChildren(
	node: ts.Node
): node is ts.DeclarationWithTypeParameterChildren {
	return (
		isSignatureDeclaration(node) ||
		isClassLikeDeclaration(node) ||
		ts.isInterfaceDeclaration(node) ||
		ts.isTypeAliasDeclaration(node) ||
		ts.isJSDocTemplateTag(node)
	);
}

export function isDeclarationWithTypeParameters(
	node: ts.Node
): node is ts.DeclarationWithTypeParameters {
	return (
		isDeclarationWithTypeParameterChildren(node) ||
		ts.isJSDocTypedefTag(node) ||
		ts.isJSDocCallbackTag(node) ||
		ts.isJSDocSignature(node)
	);
}

export function isDestructuringPattern(
	node: ts.Node
): node is ts.DestructuringPattern {
	return (
		isBindingPattern(node) ||
		ts.isObjectLiteralExpression(node) ||
		ts.isArrayLiteralExpression(node)
	);
}

export function isEntityNameExpression(
	node: ts.Node
): node is ts.EntityNameExpression {
	return ts.isIdentifier(node) || isPropertyAccessEntityNameExpression(node);
}

export function isEntityNameOrEntityNameExpression(
	node: ts.Node
): node is ts.EntityNameOrEntityNameExpression {
	return ts.isEntityName(node) || isEntityNameExpression(node);
}

export function isForInOrOfStatement(
	node: ts.Node
): node is ts.ForInOrOfStatement {
	return ts.isForInStatement(node) || ts.isForOfStatement(node);
}

export function isFunctionLikeDeclaration(
	node: ts.Node
): node is ts.FunctionLikeDeclaration {
	return (
		ts.isFunctionDeclaration(node) ||
		ts.isMethodDeclaration(node) ||
		ts.isGetAccessorDeclaration(node) ||
		ts.isSetAccessorDeclaration(node) ||
		ts.isConstructorDeclaration(node) ||
		ts.isFunctionExpression(node) ||
		ts.isArrowFunction(node)
	);
}

export function isHasDecorators(node: ts.Node): node is ts.HasDecorators {
	return (
		ts.isParameter(node) ||
		ts.isPropertyDeclaration(node) ||
		ts.isMethodDeclaration(node) ||
		ts.isGetAccessorDeclaration(node) ||
		ts.isSetAccessorDeclaration(node) ||
		ts.isClassExpression(node) ||
		ts.isClassDeclaration(node)
	);
}

export function isHasExpressionInitializer(
	node: ts.Node
): node is ts.HasExpressionInitializer {
	return (
		ts.isVariableDeclaration(node) ||
		ts.isParameter(node) ||
		ts.isBindingElement(node) ||
		ts.isPropertyDeclaration(node) ||
		ts.isPropertyAssignment(node) ||
		ts.isEnumMember(node)
	);
}

export function isHasInitializer(node: ts.Node): node is ts.HasInitializer {
	return (
		isHasExpressionInitializer(node) ||
		ts.isForStatement(node) ||
		ts.isForInStatement(node) ||
		ts.isForOfStatement(node) ||
		ts.isJsxAttribute(node)
	);
}

export function isHasJSDoc(node: ts.Node): node is ts.HasJSDoc {
	return (
		ts.isParameter(node) ||
		ts.isCallSignatureDeclaration(node) ||
		ts.isClassStaticBlockDeclaration(node) ||
		ts.isConstructSignatureDeclaration(node) ||
		ts.isMethodSignature(node) ||
		ts.isPropertySignature(node) ||
		ts.isArrowFunction(node) ||
		ts.isParenthesizedExpression(node) ||
		ts.isSpreadAssignment(node) ||
		ts.isShorthandPropertyAssignment(node) ||
		ts.isPropertyAssignment(node) ||
		ts.isFunctionExpression(node) ||
		ts.isEmptyStatement(node) ||
		ts.isDebuggerStatement(node) ||
		ts.isBlock(node) ||
		ts.isVariableStatement(node) ||
		ts.isExpressionStatement(node) ||
		ts.isIfStatement(node) ||
		ts.isDoStatement(node) ||
		ts.isWhileStatement(node) ||
		ts.isForStatement(node) ||
		ts.isForInStatement(node) ||
		ts.isForOfStatement(node) ||
		ts.isBreakStatement(node) ||
		ts.isContinueStatement(node) ||
		ts.isReturnStatement(node) ||
		ts.isWithStatement(node) ||
		ts.isSwitchStatement(node) ||
		ts.isLabeledStatement(node) ||
		ts.isThrowStatement(node) ||
		ts.isTryStatement(node) ||
		ts.isFunctionDeclaration(node) ||
		ts.isConstructorDeclaration(node) ||
		ts.isMethodDeclaration(node) ||
		ts.isVariableDeclaration(node) ||
		ts.isPropertyDeclaration(node) ||
		isAccessorDeclaration(node) ||
		isClassLikeDeclaration(node) ||
		ts.isInterfaceDeclaration(node) ||
		ts.isTypeAliasDeclaration(node) ||
		ts.isEnumMember(node) ||
		ts.isEnumDeclaration(node) ||
		ts.isModuleDeclaration(node) ||
		ts.isImportEqualsDeclaration(node) ||
		ts.isImportDeclaration(node) ||
		ts.isNamespaceExportDeclaration(node) ||
		ts.isExportAssignment(node) ||
		ts.isIndexSignatureDeclaration(node) ||
		ts.isFunctionTypeNode(node) ||
		ts.isConstructorTypeNode(node) ||
		ts.isJSDocFunctionType(node) ||
		ts.isExportDeclaration(node) ||
		ts.isNamedTupleMember(node) ||
		ts.isExportSpecifier(node) ||
		ts.isCaseClause(node) ||
		isEndOfFileToken(node)
	);
}

export function isHasModifiers(node: ts.Node): node is ts.HasModifiers {
	return (
		ts.isTypeParameterDeclaration(node) ||
		ts.isParameter(node) ||
		ts.isConstructorTypeNode(node) ||
		ts.isPropertySignature(node) ||
		ts.isPropertyDeclaration(node) ||
		ts.isMethodSignature(node) ||
		ts.isMethodDeclaration(node) ||
		ts.isConstructorDeclaration(node) ||
		ts.isGetAccessorDeclaration(node) ||
		ts.isSetAccessorDeclaration(node) ||
		ts.isIndexSignatureDeclaration(node) ||
		ts.isFunctionExpression(node) ||
		ts.isArrowFunction(node) ||
		ts.isClassExpression(node) ||
		ts.isVariableStatement(node) ||
		ts.isFunctionDeclaration(node) ||
		ts.isClassDeclaration(node) ||
		ts.isInterfaceDeclaration(node) ||
		ts.isTypeAliasDeclaration(node) ||
		ts.isEnumDeclaration(node) ||
		ts.isModuleDeclaration(node) ||
		ts.isImportEqualsDeclaration(node) ||
		ts.isImportDeclaration(node) ||
		ts.isExportAssignment(node) ||
		ts.isExportDeclaration(node)
	);
}

export function isHasType(node: ts.Node): node is ts.HasType {
	return (
		isSignatureDeclaration(node) ||
		ts.isVariableDeclaration(node) ||
		ts.isParameter(node) ||
		ts.isPropertySignature(node) ||
		ts.isPropertyDeclaration(node) ||
		ts.isTypePredicateNode(node) ||
		ts.isParenthesizedTypeNode(node) ||
		ts.isTypeOperatorNode(node) ||
		ts.isMappedTypeNode(node) ||
		ts.isAssertionExpression(node) ||
		ts.isTypeAliasDeclaration(node) ||
		ts.isJSDocTypeExpression(node) ||
		ts.isJSDocNonNullableType(node) ||
		ts.isJSDocNullableType(node) ||
		ts.isJSDocOptionalType(node) ||
		ts.isJSDocVariadicType(node)
	);
}

export function isHasTypeArguments(node: ts.Node): node is ts.HasTypeArguments {
	return (
		ts.isCallExpression(node) ||
		ts.isNewExpression(node) ||
		ts.isTaggedTemplateExpression(node) ||
		ts.isJsxOpeningElement(node) ||
		ts.isJsxSelfClosingElement(node)
	);
}

export function isJSDocComment(node: ts.Node): node is ts.JSDocComment {
	return (
		isJSDocText(node) ||
		ts.isJSDocLink(node) ||
		ts.isJSDocLinkCode(node) ||
		ts.isJSDocLinkPlain(node)
	);
}

export function isJSDocNamespaceBody(
	node: ts.Node
): node is ts.JSDocNamespaceBody {
	return ts.isIdentifier(node) || isJSDocNamespaceDeclaration(node);
}

export function isJSDocTypeReferencingNode(
	node: ts.Node
): node is ts.JSDocTypeReferencingNode {
	return (
		ts.isJSDocVariadicType(node) ||
		ts.isJSDocOptionalType(node) ||
		ts.isJSDocNullableType(node) ||
		ts.isJSDocNonNullableType(node)
	);
}

export function isJsonObjectExpression(
	node: ts.Node
): node is ts.JsonObjectExpression {
	return (
		ts.isObjectLiteralExpression(node) ||
		ts.isArrayLiteralExpression(node) ||
		isJsonMinusNumericLiteral(node) ||
		ts.isNumericLiteral(node) ||
		ts.isStringLiteral(node) ||
		isBooleanLiteral(node) ||
		isNullLiteral(node)
	);
}

export function isJsxAttributeLike(node: ts.Node): node is ts.JsxAttributeLike {
	return ts.isJsxAttribute(node) || ts.isJsxSpreadAttribute(node);
}

export function isJsxAttributeValue(
	node: ts.Node
): node is ts.JsxAttributeValue {
	return (
		ts.isStringLiteral(node) ||
		ts.isJsxExpression(node) ||
		ts.isJsxElement(node) ||
		ts.isJsxSelfClosingElement(node) ||
		ts.isJsxFragment(node)
	);
}

export function isJsxChild(node: ts.Node): node is ts.JsxChild {
	return (
		ts.isJsxText(node) ||
		ts.isJsxExpression(node) ||
		ts.isJsxElement(node) ||
		ts.isJsxSelfClosingElement(node) ||
		ts.isJsxFragment(node)
	);
}

export function isJsxTagNameExpression(
	node: ts.Node
): node is ts.JsxTagNameExpression {
	return (
		ts.isIdentifier(node) ||
		isThisExpression(node) ||
		isJsxTagNamePropertyAccess(node)
	);
}

export function isLiteralToken(node: ts.Node): node is ts.LiteralToken {
	return (
		ts.isNumericLiteral(node) ||
		ts.isBigIntLiteral(node) ||
		ts.isStringLiteral(node) ||
		ts.isJsxText(node) ||
		ts.isRegularExpressionLiteral(node) ||
		ts.isNoSubstitutionTemplateLiteral(node)
	);
}

export function isModuleBody(node: ts.Node): node is ts.ModuleBody {
	return isNamespaceBody(node) || isJSDocNamespaceBody(node);
}

export function isModuleName(node: ts.Node): node is ts.ModuleName {
	return ts.isIdentifier(node) || ts.isStringLiteral(node);
}

export function isModuleReference(node: ts.Node): node is ts.ModuleReference {
	return ts.isEntityName(node) || ts.isExternalModuleReference(node);
}

export function isNamedImportBindings(
	node: ts.Node
): node is ts.NamedImportBindings {
	return ts.isNamespaceImport(node) || ts.isNamedImports(node);
}

export function isNamedImportsOrExports(
	node: ts.Node
): node is ts.NamedImportsOrExports {
	return ts.isNamedImports(node) || ts.isNamedExports(node);
}

export function isNamespaceBody(node: ts.Node): node is ts.NamespaceBody {
	return ts.isModuleBlock(node) || isNamespaceDeclaration(node);
}

export function isObjectBindingOrAssignmentElement(
	node: ts.Node
): node is ts.ObjectBindingOrAssignmentElement {
	return (
		ts.isBindingElement(node) ||
		ts.isPropertyAssignment(node) ||
		ts.isShorthandPropertyAssignment(node) ||
		ts.isSpreadAssignment(node)
	);
}

export function isObjectBindingOrAssignmentPattern(
	node: ts.Node
): node is ts.ObjectBindingOrAssignmentPattern {
	return ts.isObjectBindingPattern(node) || ts.isObjectLiteralExpression(node);
}

export function isObjectTypeDeclaration(
	node: ts.Node
): node is ts.ObjectTypeDeclaration {
	return (
		isClassLikeDeclaration(node) ||
		ts.isInterfaceDeclaration(node) ||
		ts.isTypeLiteralNode(node)
	);
}

export function isParameterPropertyModifier(
	node: ts.Node
): node is ts.ParameterPropertyModifier {
	return isAccessibilityModifier(node) || isReadonlyKeyword(node);
}

export function isPropertyNameLiteral(
	node: ts.Node
): node is ts.PropertyNameLiteral {
	return (
		ts.isIdentifier(node) ||
		ts.isStringLiteralLike(node) ||
		ts.isNumericLiteral(node)
	);
}

export function isPseudoLiteralToken(
	node: ts.Node
): node is ts.PseudoLiteralToken {
	return (
		ts.isTemplateHead(node) ||
		ts.isTemplateMiddle(node) ||
		ts.isTemplateTail(node)
	);
}

export function isSignatureDeclaration(
	node: ts.Node
): node is ts.SignatureDeclaration {
	return (
		ts.isCallSignatureDeclaration(node) ||
		ts.isConstructSignatureDeclaration(node) ||
		ts.isMethodSignature(node) ||
		ts.isIndexSignatureDeclaration(node) ||
		ts.isFunctionTypeNode(node) ||
		ts.isConstructorTypeNode(node) ||
		ts.isJSDocFunctionType(node) ||
		ts.isFunctionDeclaration(node) ||
		ts.isMethodDeclaration(node) ||
		ts.isConstructorDeclaration(node) ||
		isAccessorDeclaration(node) ||
		ts.isFunctionExpression(node) ||
		ts.isArrowFunction(node)
	);
}

export function isSuperProperty(node: ts.Node): node is ts.SuperProperty {
	return (
		isSuperPropertyAccessExpression(node) ||
		isSuperElementAccessExpression(node)
	);
}

export function isTypeOnlyCompatibleAliasDeclaration(
	node: ts.Node
): node is ts.TypeOnlyCompatibleAliasDeclaration {
	return (
		ts.isImportClause(node) ||
		ts.isImportEqualsDeclaration(node) ||
		ts.isNamespaceImport(node) ||
		ts.isImportOrExportSpecifier(node)
	);
}

export function isTypeReferenceType(
	node: ts.Node
): node is ts.TypeReferenceType {
	return ts.isTypeReferenceNode(node) || ts.isExpressionWithTypeArguments(node);
}

export function isUnionOrIntersectionTypeNode(
	node: ts.Node
): node is ts.UnionOrIntersectionTypeNode {
	return ts.isUnionTypeNode(node) || ts.isIntersectionTypeNode(node);
}

export function isUnparsedSourceText(
	node: ts.Node
): node is ts.UnparsedSourceText {
	return ts.isUnparsedPrepend(node) || ts.isUnparsedTextLike(node);
}

export function isVariableLikeDeclaration(
	node: ts.Node
): node is ts.VariableLikeDeclaration {
	return (
		ts.isVariableDeclaration(node) ||
		ts.isParameter(node) ||
		ts.isBindingElement(node) ||
		ts.isPropertyDeclaration(node) ||
		ts.isPropertyAssignment(node) ||
		ts.isPropertySignature(node) ||
		ts.isJsxAttribute(node) ||
		ts.isShorthandPropertyAssignment(node) ||
		ts.isEnumMember(node) ||
		ts.isJSDocPropertyTag(node) ||
		ts.isJSDocParameterTag(node)
	);
}
