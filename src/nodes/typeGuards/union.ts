import * as ts from "typescript";

import { isTsVersionAtLeast } from "../../utils.js";
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

/**
 * Test if a node is an `AccessExpression`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be an `AccessExpression`.
 */
export function isAccessExpression(node: ts.Node): node is ts.AccessExpression {
	return (
		ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)
	);
}

/**
 * Test if a node is an `AccessibilityModifier`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be an `AccessibilityModifier`.
 */
export function isAccessibilityModifier(
	node: ts.Node
): node is ts.AccessibilityModifier {
	return (
		isPublicKeyword(node) || isPrivateKeyword(node) || isProtectedKeyword(node)
	);
}

/**
 * Test if a node is an `AccessorDeclaration`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be an `AccessorDeclaration`.
 */
export function isAccessorDeclaration(
	node: ts.Node
): node is ts.AccessorDeclaration {
	return ts.isGetAccessorDeclaration(node) || ts.isSetAccessorDeclaration(node);
}

/**
 * Test if a node is an `ArrayBindingElement`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be an `ArrayBindingElement`.
 */
export function isArrayBindingElement(
	node: ts.Node
): node is ts.ArrayBindingElement {
	return ts.isBindingElement(node) || ts.isOmittedExpression(node);
}

/**
 * Test if a node is an `ArrayBindingOrAssignmentPattern`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be an `ArrayBindingOrAssignmentPattern`.
 */
export function isArrayBindingOrAssignmentPattern(
	node: ts.Node
): node is ts.ArrayBindingOrAssignmentPattern {
	return ts.isArrayBindingPattern(node) || ts.isArrayLiteralExpression(node);
}

/**
 * Test if a node is an `AssignmentPattern`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be an `AssignmentPattern`.
 */
export function isAssignmentPattern(
	node: ts.Node
): node is ts.AssignmentPattern {
	return (
		ts.isObjectLiteralExpression(node) || ts.isArrayLiteralExpression(node)
	);
}

/**
 * Test if a node is a `BindingOrAssignmentElementRestIndicator`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `BindingOrAssignmentElementRestIndicator`.
 */
export function isBindingOrAssignmentElementRestIndicator(
	node: ts.Node
): node is ts.BindingOrAssignmentElementRestIndicator {
	if (ts.isSpreadElement(node) || ts.isSpreadAssignment(node)) {
		return true;
	}

	if (isTsVersionAtLeast(4, 4)) {
		return ts.isDotDotDotToken(node);
	}

	return false;
}

/**
 * Test if a node is a `BindingOrAssignmentElementTarget`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `BindingOrAssignmentElementTarget`.
 */
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

/**
 * Test if a node is a `BindingOrAssignmentPattern`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `BindingOrAssignmentPattern`.
 */
export function isBindingOrAssignmentPattern(
	node: ts.Node
): node is ts.BindingOrAssignmentPattern {
	return (
		isObjectBindingOrAssignmentPattern(node) ||
		isArrayBindingOrAssignmentPattern(node)
	);
}

/**
 * Test if a node is a `BindingPattern`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `BindingPattern`.
 */
export function isBindingPattern(node: ts.Node): node is ts.BindingPattern {
	return ts.isObjectBindingPattern(node) || ts.isArrayBindingPattern(node);
}

/**
 * Test if a node is a `BlockLike`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `BlockLike`.
 */
export function isBlockLike(node: ts.Node): node is ts.BlockLike {
	return (
		ts.isSourceFile(node) ||
		ts.isBlock(node) ||
		ts.isModuleBlock(node) ||
		ts.isCaseOrDefaultClause(node)
	);
}

/**
 * Test if a node is a `BooleanLiteral`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `BooleanLiteral`.
 */
export function isBooleanLiteral(node: ts.Node): node is ts.BooleanLiteral {
	return isTrueLiteral(node) || isFalseLiteral(node);
}

/**
 * Test if a node is a `ClassLikeDeclaration`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `ClassLikeDeclaration`.
 */
export function isClassLikeDeclaration(
	node: ts.Node
): node is ts.ClassLikeDeclaration {
	return ts.isClassDeclaration(node) || ts.isClassExpression(node);
}

/**
 * Test if a node is a `ClassMemberModifier`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `ClassMemberModifier`.
 */
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

/**
 * Test if a node is a `DeclarationName`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `DeclarationName`.
 */
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

/**
 * Test if a node is a `DeclarationWithTypeParameterChildren`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `DeclarationWithTypeParameterChildren`.
 */
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

/**
 * Test if a node is a `DeclarationWithTypeParameters`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `DeclarationWithTypeParameters`.
 */
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

/**
 * Test if a node is a `DestructuringPattern`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `DestructuringPattern`.
 */
export function isDestructuringPattern(
	node: ts.Node
): node is ts.DestructuringPattern {
	return (
		isBindingPattern(node) ||
		ts.isObjectLiteralExpression(node) ||
		ts.isArrayLiteralExpression(node)
	);
}

/**
 * Test if a node is an `EntityNameExpression`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be an `EntityNameExpression`.
 */
export function isEntityNameExpression(
	node: ts.Node
): node is ts.EntityNameExpression {
	return ts.isIdentifier(node) || isPropertyAccessEntityNameExpression(node);
}

/**
 * Test if a node is an `EntityNameOrEntityNameExpression`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be an `EntityNameOrEntityNameExpression`.
 */
export function isEntityNameOrEntityNameExpression(
	node: ts.Node
): node is ts.EntityNameOrEntityNameExpression {
	return ts.isEntityName(node) || isEntityNameExpression(node);
}

/**
 * Test if a node is a `ForInOrOfStatement`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `ForInOrOfStatement`.
 */
export function isForInOrOfStatement(
	node: ts.Node
): node is ts.ForInOrOfStatement {
	return ts.isForInStatement(node) || ts.isForOfStatement(node);
}

/**
 * Test if a node is a `FunctionLikeDeclaration`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `FunctionLikeDeclaration`.
 */
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

/**
 * Test if a node is a `HasDecorators`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `HasDecorators`.
 */
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

/**
 * Test if a node is a `HasExpressionInitializer`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `HasExpressionInitializer`.
 */
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

/**
 * Test if a node is a `HasInitializer`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `HasInitializer`.
 */
export function isHasInitializer(node: ts.Node): node is ts.HasInitializer {
	return (
		isHasExpressionInitializer(node) ||
		ts.isForStatement(node) ||
		ts.isForInStatement(node) ||
		ts.isForOfStatement(node) ||
		ts.isJsxAttribute(node)
	);
}

/**
 * Test if a node is a `HasJSDoc`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `HasJSDoc`.
 */
export function isHasJSDoc(node: ts.Node): node is ts.HasJSDoc {
	if (
		ts.isParameter(node) ||
		ts.isCallSignatureDeclaration(node) ||
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
	) {
		return true;
	}

	if (isTsVersionAtLeast(4, 4)) {
		return ts.isClassStaticBlockDeclaration(node);
	}

	return false;
}

/**
 * Test if a node is a `HasModifiers`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `HasModifiers`.
 */
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

/**
 * Test if a node is a `HasType`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `HasType`.
 */
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

/**
 * Test if a node is a `HasTypeArguments`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `HasTypeArguments`.
 */
export function isHasTypeArguments(node: ts.Node): node is ts.HasTypeArguments {
	return (
		ts.isCallExpression(node) ||
		ts.isNewExpression(node) ||
		ts.isTaggedTemplateExpression(node) ||
		ts.isJsxOpeningElement(node) ||
		ts.isJsxSelfClosingElement(node)
	);
}

/**
 * Test if a node is a `JSDocComment`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `JSDocComment`.
 */
export function isJSDocComment(node: ts.Node): node is ts.JSDocComment {
	if (isJSDocText(node)) {
		return true;
	}

	if (isTsVersionAtLeast(4, 4)) {
		return (
			ts.isJSDocLink(node) ||
			ts.isJSDocLinkCode(node) ||
			ts.isJSDocLinkPlain(node)
		);
	}

	return false;
}

/**
 * Test if a node is a `JSDocNamespaceBody`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `JSDocNamespaceBody`.
 */
export function isJSDocNamespaceBody(
	node: ts.Node
): node is ts.JSDocNamespaceBody {
	return ts.isIdentifier(node) || isJSDocNamespaceDeclaration(node);
}

/**
 * Test if a node is a `JSDocTypeReferencingNode`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `JSDocTypeReferencingNode`.
 */
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

/**
 * Test if a node is a `JsonObjectExpression`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `JsonObjectExpression`.
 */
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

/**
 * Test if a node is a `JsxAttributeLike`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `JsxAttributeLike`.
 */
export function isJsxAttributeLike(node: ts.Node): node is ts.JsxAttributeLike {
	return ts.isJsxAttribute(node) || ts.isJsxSpreadAttribute(node);
}

/**
 * Test if a node is a `JsxAttributeValue`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `JsxAttributeValue`.
 */
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

/**
 * Test if a node is a `JsxChild`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `JsxChild`.
 */
export function isJsxChild(node: ts.Node): node is ts.JsxChild {
	return (
		ts.isJsxText(node) ||
		ts.isJsxExpression(node) ||
		ts.isJsxElement(node) ||
		ts.isJsxSelfClosingElement(node) ||
		ts.isJsxFragment(node)
	);
}

/**
 * Test if a node is a `JsxTagNameExpression`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `JsxTagNameExpression`.
 */
export function isJsxTagNameExpression(
	node: ts.Node
): node is ts.JsxTagNameExpression {
	return (
		ts.isIdentifier(node) ||
		isThisExpression(node) ||
		isJsxTagNamePropertyAccess(node)
	);
}

/**
 * Test if a node is a `LiteralToken`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `LiteralToken`.
 */
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

/**
 * Test if a node is a `ModuleBody`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `ModuleBody`.
 */
export function isModuleBody(node: ts.Node): node is ts.ModuleBody {
	return isNamespaceBody(node) || isJSDocNamespaceBody(node);
}

/**
 * Test if a node is a `ModuleName`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `ModuleName`.
 */
export function isModuleName(node: ts.Node): node is ts.ModuleName {
	return ts.isIdentifier(node) || ts.isStringLiteral(node);
}

/**
 * Test if a node is a `ModuleReference`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `ModuleReference`.
 */
export function isModuleReference(node: ts.Node): node is ts.ModuleReference {
	return ts.isEntityName(node) || ts.isExternalModuleReference(node);
}

/**
 * Test if a node is a `NamedImportBindings`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `NamedImportBindings`.
 */
export function isNamedImportBindings(
	node: ts.Node
): node is ts.NamedImportBindings {
	return ts.isNamespaceImport(node) || ts.isNamedImports(node);
}

/**
 * Test if a node is a `NamedImportsOrExports`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `NamedImportsOrExports`.
 */
export function isNamedImportsOrExports(
	node: ts.Node
): node is ts.NamedImportsOrExports {
	return ts.isNamedImports(node) || ts.isNamedExports(node);
}

/**
 * Test if a node is a `NamespaceBody`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `NamespaceBody`.
 */
export function isNamespaceBody(node: ts.Node): node is ts.NamespaceBody {
	return ts.isModuleBlock(node) || isNamespaceDeclaration(node);
}

/**
 * Test if a node is an `ObjectBindingOrAssignmentElement`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be an `ObjectBindingOrAssignmentElement`.
 */
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

/**
 * Test if a node is an `ObjectBindingOrAssignmentPattern`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be an `ObjectBindingOrAssignmentPattern`.
 */
export function isObjectBindingOrAssignmentPattern(
	node: ts.Node
): node is ts.ObjectBindingOrAssignmentPattern {
	return ts.isObjectBindingPattern(node) || ts.isObjectLiteralExpression(node);
}

/**
 * Test if a node is an `ObjectTypeDeclaration`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be an `ObjectTypeDeclaration`.
 */
export function isObjectTypeDeclaration(
	node: ts.Node
): node is ts.ObjectTypeDeclaration {
	return (
		isClassLikeDeclaration(node) ||
		ts.isInterfaceDeclaration(node) ||
		ts.isTypeLiteralNode(node)
	);
}

/**
 * Test if a node is a `ParameterPropertyModifier`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `ParameterPropertyModifier`.
 */
export function isParameterPropertyModifier(
	node: ts.Node
): node is ts.ParameterPropertyModifier {
	return isAccessibilityModifier(node) || isReadonlyKeyword(node);
}

/**
 * Test if a node is a `PropertyNameLiteral`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `PropertyNameLiteral`.
 */
export function isPropertyNameLiteral(
	node: ts.Node
): node is ts.PropertyNameLiteral {
	return (
		ts.isIdentifier(node) ||
		ts.isStringLiteralLike(node) ||
		ts.isNumericLiteral(node)
	);
}

/**
 * Test if a node is a `PseudoLiteralToken`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `PseudoLiteralToken`.
 */
export function isPseudoLiteralToken(
	node: ts.Node
): node is ts.PseudoLiteralToken {
	return (
		ts.isTemplateHead(node) ||
		ts.isTemplateMiddle(node) ||
		ts.isTemplateTail(node)
	);
}

/**
 * Test if a node is a `SignatureDeclaration`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `SignatureDeclaration`.
 */
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

/**
 * Test if a node is a `SuperProperty`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `SuperProperty`.
 */
export function isSuperProperty(node: ts.Node): node is ts.SuperProperty {
	return (
		isSuperPropertyAccessExpression(node) ||
		isSuperElementAccessExpression(node)
	);
}

/**
 * Test if a node is a `TypeOnlyCompatibleAliasDeclaration`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `TypeOnlyCompatibleAliasDeclaration`.
 */
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

/**
 * Test if a node is a `TypeReferenceType`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `TypeReferenceType`.
 */
export function isTypeReferenceType(
	node: ts.Node
): node is ts.TypeReferenceType {
	return ts.isTypeReferenceNode(node) || ts.isExpressionWithTypeArguments(node);
}

/**
 * Test if a node is an `UnionOrIntersectionTypeNode`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be an `UnionOrIntersectionTypeNode`.
 */
export function isUnionOrIntersectionTypeNode(
	node: ts.Node
): node is ts.UnionOrIntersectionTypeNode {
	return ts.isUnionTypeNode(node) || ts.isIntersectionTypeNode(node);
}

/**
 * Test if a node is an `UnparsedSourceText`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be an `UnparsedSourceText`.
 */
export function isUnparsedSourceText(
	node: ts.Node
): node is ts.UnparsedSourceText {
	return ts.isUnparsedPrepend(node) || ts.isUnparsedTextLike(node);
}

/**
 * Test if a node is a `VariableLikeDeclaration`.
 *
 * @category Nodes - Type Guards
 * @param node - The node in question.
 * @returns True if the given node appears to be a `VariableLikeDeclaration`.
 */
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
