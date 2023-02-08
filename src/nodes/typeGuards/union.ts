import * as ts from "typescript";

import {
	isArrayDestructuringAssignment,
	isEqualsAssignmentExpression,
	isJSDocNamespaceDeclaration,
	isJsxTagNamePropertyAccess,
	isNamespaceDeclaration,
	isObjectDestructuringAssignment,
	isPropertyAccessEntityNameExpression,
	isSuperElementAccessExpression,
	isSuperPropertyAccessExpression,
} from "./compound";
import { isExpression } from "./internal";
import {
	isAccessorKeyword,
	isArrayBindingPattern,
	isArrayLiteralExpression,
	isArrowFunction,
	isBigIntLiteral,
	isBindingElement,
	isBlock,
	isBreakStatement,
	isCallExpression,
	isCallSignatureDeclaration,
	isCaseClause,
	isClassDeclaration,
	isClassExpression,
	isClassStaticBlockDeclaration,
	isComputedPropertyName,
	isConstructorDeclaration,
	isConstructorTypeNode,
	isConstructSignatureDeclaration,
	isContinueStatement,
	isDebuggerStatement,
	isDoStatement,
	isDotDotDotToken,
	isElementAccessExpression,
	isEmptyStatement,
	isEndOfFileToken,
	isEnumDeclaration,
	isEnumMember,
	isExportAssignment,
	isExportDeclaration,
	isExportSpecifier,
	isExpressionStatement,
	isExpressionWithTypeArguments,
	isExternalModuleReference,
	isFalseLiteral,
	isForInStatement,
	isForOfStatement,
	isForStatement,
	isFunctionDeclaration,
	isFunctionExpression,
	isFunctionTypeNode,
	isGetAccessorDeclaration,
	isIdentifier,
	isIfStatement,
	isImportClause,
	isImportDeclaration,
	isImportEqualsDeclaration,
	isIndexSignatureDeclaration,
	isInterfaceDeclaration,
	isIntersectionTypeNode,
	isJSDocCallbackTag,
	isJSDocFunctionType,
	isJSDocLink,
	isJSDocLinkCode,
	isJSDocLinkPlain,
	isJSDocNonNullableType,
	isJSDocNullableType,
	isJSDocOptionalType,
	isJSDocParameterTag,
	isJSDocPropertyTag,
	isJSDocSignature,
	isJSDocTemplateTag,
	isJSDocText,
	isJSDocTypedefTag,
	isJSDocTypeExpression,
	isJSDocVariadicType,
	isJsonMinusNumericLiteral,
	isJsxAttribute,
	isJsxElement,
	isJsxExpression,
	isJsxFragment,
	isJsxOpeningElement,
	isJsxSelfClosingElement,
	isJsxSpreadAttribute,
	isJsxText,
	isLabeledStatement,
	isMappedTypeNode,
	isMethodDeclaration,
	isMethodSignature,
	isModuleBlock,
	isModuleDeclaration,
	isNamedExports,
	isNamedImports,
	isNamedTupleMember,
	isNamespaceExportDeclaration,
	isNamespaceImport,
	isNewExpression,
	isNoSubstitutionTemplateLiteral,
	isNullLiteral,
	isNumericLiteral,
	isObjectBindingPattern,
	isObjectLiteralExpression,
	isOmittedExpression,
	isParameterDeclaration,
	isParenthesizedExpression,
	isParenthesizedTypeNode,
	isPrivateIdentifier,
	isPrivateKeyword,
	isPropertyAccessExpression,
	isPropertyAssignment,
	isPropertyDeclaration,
	isPropertySignature,
	isProtectedKeyword,
	isPublicKeyword,
	isReadonlyKeyword,
	isRegularExpressionLiteral,
	isReturnStatement,
	isSetAccessorDeclaration,
	isShorthandPropertyAssignment,
	isSourceFile,
	isSpreadAssignment,
	isSpreadElement,
	isStaticKeyword,
	isStringLiteral,
	isSwitchStatement,
	isTaggedTemplateExpression,
	isTemplateHead,
	isTemplateMiddle,
	isTemplateTail,
	isThisExpression,
	isThrowStatement,
	isTrueLiteral,
	isTryStatement,
	isTypeAliasDeclaration,
	isTypeLiteralNode,
	isTypeOperatorNode,
	isTypeParameterDeclaration,
	isTypePredicateNode,
	isTypeReferenceNode,
	isUnionTypeNode,
	isUnparsedPrepend,
	isUnparsedTextLike,
	isVariableDeclaration,
	isVariableDeclarationList,
	isVariableStatement,
	isWhileStatement,
	isWithStatement,
} from "./single";

export function isAccessExpression(node: ts.Node): node is ts.AccessExpression {
	return isPropertyAccessExpression(node) || isElementAccessExpression(node);
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
	return isGetAccessorDeclaration(node) || isSetAccessorDeclaration(node);
}
export function isArrayBindingElement(
	node: ts.Node
): node is ts.ArrayBindingElement {
	return isBindingElement(node) || isOmittedExpression(node);
}
export function isArrayBindingOrAssignmentElement(
	node: ts.Node
): node is ts.ArrayBindingOrAssignmentElement {
	return (
		isBindingElement(node) ||
		isOmittedExpression(node) ||
		isSpreadElement(node) ||
		isArrayLiteralExpression(node) ||
		isObjectLiteralExpression(node) ||
		isEqualsAssignmentExpression(node) ||
		isIdentifier(node) ||
		isPropertyAccessExpression(node) ||
		isElementAccessExpression(node)
	);
}
export function isArrayBindingOrAssignmentPattern(
	node: ts.Node
): node is ts.ArrayBindingOrAssignmentPattern {
	return isArrayBindingPattern(node) || isArrayLiteralExpression(node);
}
export function isAssignmentPattern(
	node: ts.Node
): node is ts.AssignmentPattern {
	return isObjectLiteralExpression(node) || isArrayLiteralExpression(node);
}
export function isBindingOrAssignmentElement(
	node: ts.Node
): node is ts.BindingOrAssignmentElement {
	return (
		isVariableDeclaration(node) ||
		isParameterDeclaration(node) ||
		isObjectBindingOrAssignmentElement(node) ||
		isArrayBindingOrAssignmentElement(node)
	);
}
export function isBindingOrAssignmentElementRestIndicator(
	node: ts.Node
): node is ts.BindingOrAssignmentElementRestIndicator {
	return (
		isDotDotDotToken(node) || isSpreadElement(node) || isSpreadAssignment(node)
	);
}
export function isBindingOrAssignmentElementTarget(
	node: ts.Node
): node is ts.BindingOrAssignmentElementTarget {
	return (
		isBindingOrAssignmentPattern(node) ||
		isIdentifier(node) ||
		isPropertyAccessExpression(node) ||
		isElementAccessExpression(node) ||
		isOmittedExpression(node)
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
	return isObjectBindingPattern(node) || isArrayBindingPattern(node);
}
export function isBlockLike(node: ts.Node): node is ts.BlockLike {
	return (
		isSourceFile(node) ||
		isBlock(node) ||
		isModuleBlock(node) ||
		ts.isCaseOrDefaultClause(node)
	);
}
export function isBooleanLiteral(node: ts.Node): node is ts.BooleanLiteral {
	return isTrueLiteral(node) || isFalseLiteral(node);
}
export function isClassLikeDeclaration(
	node: ts.Node
): node is ts.ClassLikeDeclaration {
	return isClassDeclaration(node) || isClassExpression(node);
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
export function isConciseBody(node: ts.Node): node is ts.ConciseBody {
	return isBlock(node) || isExpression(node);
}
export function isDeclarationName(node: ts.Node): node is ts.DeclarationName {
	return (
		isIdentifier(node) ||
		isPrivateIdentifier(node) ||
		ts.isStringLiteralLike(node) ||
		isNumericLiteral(node) ||
		isComputedPropertyName(node) ||
		isElementAccessExpression(node) ||
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
		isInterfaceDeclaration(node) ||
		isTypeAliasDeclaration(node) ||
		isJSDocTemplateTag(node)
	);
}
export function isDeclarationWithTypeParameters(
	node: ts.Node
): node is ts.DeclarationWithTypeParameters {
	return (
		isDeclarationWithTypeParameterChildren(node) ||
		isJSDocTypedefTag(node) ||
		isJSDocCallbackTag(node) ||
		isJSDocSignature(node)
	);
}
export function isDestructuringAssignment(
	node: ts.Node
): node is ts.DestructuringAssignment {
	return (
		isObjectDestructuringAssignment(node) ||
		isArrayDestructuringAssignment(node)
	);
}
export function isDestructuringPattern(
	node: ts.Node
): node is ts.DestructuringPattern {
	return (
		isBindingPattern(node) ||
		isObjectLiteralExpression(node) ||
		isArrayLiteralExpression(node)
	);
}
export function isEntityNameExpression(
	node: ts.Node
): node is ts.EntityNameExpression {
	return isIdentifier(node) || isPropertyAccessEntityNameExpression(node);
}
export function isEntityNameOrEntityNameExpression(
	node: ts.Node
): node is ts.EntityNameOrEntityNameExpression {
	return ts.isEntityName(node) || isEntityNameExpression(node);
}
export function isForInitializer(node: ts.Node): node is ts.ForInitializer {
	return isVariableDeclarationList(node) || isExpression(node);
}
export function isForInOrOfStatement(
	node: ts.Node
): node is ts.ForInOrOfStatement {
	return isForInStatement(node) || isForOfStatement(node);
}
export function isFunctionLikeDeclaration(
	node: ts.Node
): node is ts.FunctionLikeDeclaration {
	return (
		isFunctionDeclaration(node) ||
		isMethodDeclaration(node) ||
		isGetAccessorDeclaration(node) ||
		isSetAccessorDeclaration(node) ||
		isConstructorDeclaration(node) ||
		isFunctionExpression(node) ||
		isArrowFunction(node)
	);
}
export function isHasDecorators(node: ts.Node): node is ts.HasDecorators {
	return (
		isParameterDeclaration(node) ||
		isPropertyDeclaration(node) ||
		isMethodDeclaration(node) ||
		isGetAccessorDeclaration(node) ||
		isSetAccessorDeclaration(node) ||
		isClassExpression(node) ||
		isClassDeclaration(node)
	);
}
export function isHasExpressionInitializer(
	node: ts.Node
): node is ts.HasExpressionInitializer {
	return (
		isVariableDeclaration(node) ||
		isParameterDeclaration(node) ||
		isBindingElement(node) ||
		isPropertyDeclaration(node) ||
		isPropertyAssignment(node) ||
		isEnumMember(node)
	);
}
export function isHasInitializer(node: ts.Node): node is ts.HasInitializer {
	return (
		isHasExpressionInitializer(node) ||
		isForStatement(node) ||
		isForInStatement(node) ||
		isForOfStatement(node) ||
		isJsxAttribute(node)
	);
}
export function isHasJSDoc(node: ts.Node): node is ts.HasJSDoc {
	return (
		isParameterDeclaration(node) ||
		isCallSignatureDeclaration(node) ||
		isClassStaticBlockDeclaration(node) ||
		isConstructSignatureDeclaration(node) ||
		isMethodSignature(node) ||
		isPropertySignature(node) ||
		isArrowFunction(node) ||
		isParenthesizedExpression(node) ||
		isSpreadAssignment(node) ||
		isShorthandPropertyAssignment(node) ||
		isPropertyAssignment(node) ||
		isFunctionExpression(node) ||
		isEmptyStatement(node) ||
		isDebuggerStatement(node) ||
		isBlock(node) ||
		isVariableStatement(node) ||
		isExpressionStatement(node) ||
		isIfStatement(node) ||
		isDoStatement(node) ||
		isWhileStatement(node) ||
		isForStatement(node) ||
		isForInStatement(node) ||
		isForOfStatement(node) ||
		isBreakStatement(node) ||
		isContinueStatement(node) ||
		isReturnStatement(node) ||
		isWithStatement(node) ||
		isSwitchStatement(node) ||
		isLabeledStatement(node) ||
		isThrowStatement(node) ||
		isTryStatement(node) ||
		isFunctionDeclaration(node) ||
		isConstructorDeclaration(node) ||
		isMethodDeclaration(node) ||
		isVariableDeclaration(node) ||
		isPropertyDeclaration(node) ||
		isAccessorDeclaration(node) ||
		isClassLikeDeclaration(node) ||
		isInterfaceDeclaration(node) ||
		isTypeAliasDeclaration(node) ||
		isEnumMember(node) ||
		isEnumDeclaration(node) ||
		isModuleDeclaration(node) ||
		isImportEqualsDeclaration(node) ||
		isImportDeclaration(node) ||
		isNamespaceExportDeclaration(node) ||
		isExportAssignment(node) ||
		isIndexSignatureDeclaration(node) ||
		isFunctionTypeNode(node) ||
		isConstructorTypeNode(node) ||
		isJSDocFunctionType(node) ||
		isExportDeclaration(node) ||
		isNamedTupleMember(node) ||
		isExportSpecifier(node) ||
		isCaseClause(node) ||
		isEndOfFileToken(node)
	);
}
export function isHasModifiers(node: ts.Node): node is ts.HasModifiers {
	return (
		isTypeParameterDeclaration(node) ||
		isParameterDeclaration(node) ||
		isConstructorTypeNode(node) ||
		isPropertySignature(node) ||
		isPropertyDeclaration(node) ||
		isMethodSignature(node) ||
		isMethodDeclaration(node) ||
		isConstructorDeclaration(node) ||
		isGetAccessorDeclaration(node) ||
		isSetAccessorDeclaration(node) ||
		isIndexSignatureDeclaration(node) ||
		isFunctionExpression(node) ||
		isArrowFunction(node) ||
		isClassExpression(node) ||
		isVariableStatement(node) ||
		isFunctionDeclaration(node) ||
		isClassDeclaration(node) ||
		isInterfaceDeclaration(node) ||
		isTypeAliasDeclaration(node) ||
		isEnumDeclaration(node) ||
		isModuleDeclaration(node) ||
		isImportEqualsDeclaration(node) ||
		isImportDeclaration(node) ||
		isExportAssignment(node) ||
		isExportDeclaration(node)
	);
}
export function isHasType(node: ts.Node): node is ts.HasType {
	return (
		isSignatureDeclaration(node) ||
		isVariableDeclaration(node) ||
		isParameterDeclaration(node) ||
		isPropertySignature(node) ||
		isPropertyDeclaration(node) ||
		isTypePredicateNode(node) ||
		isParenthesizedTypeNode(node) ||
		isTypeOperatorNode(node) ||
		isMappedTypeNode(node) ||
		ts.isAssertionExpression(node) ||
		isTypeAliasDeclaration(node) ||
		isJSDocTypeExpression(node) ||
		isJSDocNonNullableType(node) ||
		isJSDocNullableType(node) ||
		isJSDocOptionalType(node) ||
		isJSDocVariadicType(node)
	);
}
export function isHasTypeArguments(node: ts.Node): node is ts.HasTypeArguments {
	return (
		isCallExpression(node) ||
		isNewExpression(node) ||
		isTaggedTemplateExpression(node) ||
		isJsxOpeningElement(node) ||
		isJsxSelfClosingElement(node)
	);
}
export function isJSDocComment(node: ts.Node): node is ts.JSDocComment {
	return (
		isJSDocText(node) ||
		isJSDocLink(node) ||
		isJSDocLinkCode(node) ||
		isJSDocLinkPlain(node)
	);
}
export function isJSDocNamespaceBody(
	node: ts.Node
): node is ts.JSDocNamespaceBody {
	return isIdentifier(node) || isJSDocNamespaceDeclaration(node);
}
export function isJSDocTypeReferencingNode(
	node: ts.Node
): node is ts.JSDocTypeReferencingNode {
	return (
		isJSDocVariadicType(node) ||
		isJSDocOptionalType(node) ||
		isJSDocNullableType(node) ||
		isJSDocNonNullableType(node)
	);
}
export function isJsonObjectExpression(
	node: ts.Node
): node is ts.JsonObjectExpression {
	return (
		isObjectLiteralExpression(node) ||
		isArrayLiteralExpression(node) ||
		isJsonMinusNumericLiteral(node) ||
		isNumericLiteral(node) ||
		isStringLiteral(node) ||
		isBooleanLiteral(node) ||
		isNullLiteral(node)
	);
}
export function isJsxAttributeLike(node: ts.Node): node is ts.JsxAttributeLike {
	return isJsxAttribute(node) || isJsxSpreadAttribute(node);
}
export function isJsxAttributeValue(
	node: ts.Node
): node is ts.JsxAttributeValue {
	return (
		isStringLiteral(node) ||
		isJsxExpression(node) ||
		isJsxElement(node) ||
		isJsxSelfClosingElement(node) ||
		isJsxFragment(node)
	);
}
export function isJsxChild(node: ts.Node): node is ts.JsxChild {
	return (
		isJsxText(node) ||
		isJsxExpression(node) ||
		isJsxElement(node) ||
		isJsxSelfClosingElement(node) ||
		isJsxFragment(node)
	);
}
export function isJsxTagNameExpression(
	node: ts.Node
): node is ts.JsxTagNameExpression {
	return (
		isIdentifier(node) ||
		isThisExpression(node) ||
		isJsxTagNamePropertyAccess(node)
	);
}
export function isLiteralToken(node: ts.Node): node is ts.LiteralToken {
	return (
		isNumericLiteral(node) ||
		isBigIntLiteral(node) ||
		isStringLiteral(node) ||
		isJsxText(node) ||
		isRegularExpressionLiteral(node) ||
		isNoSubstitutionTemplateLiteral(node)
	);
}
export function isModuleBody(node: ts.Node): node is ts.ModuleBody {
	return isNamespaceBody(node) || isJSDocNamespaceBody(node);
}
export function isModuleName(node: ts.Node): node is ts.ModuleName {
	return isIdentifier(node) || isStringLiteral(node);
}
export function isModuleReference(node: ts.Node): node is ts.ModuleReference {
	return ts.isEntityName(node) || isExternalModuleReference(node);
}
export function isNamedImportBindings(
	node: ts.Node
): node is ts.NamedImportBindings {
	return isNamespaceImport(node) || isNamedImports(node);
}
export function isNamedImportsOrExports(
	node: ts.Node
): node is ts.NamedImportsOrExports {
	return isNamedImports(node) || isNamedExports(node);
}
export function isNamespaceBody(node: ts.Node): node is ts.NamespaceBody {
	return isModuleBlock(node) || isNamespaceDeclaration(node);
}
export function isObjectBindingOrAssignmentElement(
	node: ts.Node
): node is ts.ObjectBindingOrAssignmentElement {
	return (
		isBindingElement(node) ||
		isPropertyAssignment(node) ||
		isShorthandPropertyAssignment(node) ||
		isSpreadAssignment(node)
	);
}
export function isObjectBindingOrAssignmentPattern(
	node: ts.Node
): node is ts.ObjectBindingOrAssignmentPattern {
	return isObjectBindingPattern(node) || isObjectLiteralExpression(node);
}
export function isObjectTypeDeclaration(
	node: ts.Node
): node is ts.ObjectTypeDeclaration {
	return (
		isClassLikeDeclaration(node) ||
		isInterfaceDeclaration(node) ||
		isTypeLiteralNode(node)
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
		isIdentifier(node) || ts.isStringLiteralLike(node) || isNumericLiteral(node)
	);
}
export function isPseudoLiteralToken(
	node: ts.Node
): node is ts.PseudoLiteralToken {
	return isTemplateHead(node) || isTemplateMiddle(node) || isTemplateTail(node);
}
export function isSignatureDeclaration(
	node: ts.Node
): node is ts.SignatureDeclaration {
	return (
		isCallSignatureDeclaration(node) ||
		isConstructSignatureDeclaration(node) ||
		isMethodSignature(node) ||
		isIndexSignatureDeclaration(node) ||
		isFunctionTypeNode(node) ||
		isConstructorTypeNode(node) ||
		isJSDocFunctionType(node) ||
		isFunctionDeclaration(node) ||
		isMethodDeclaration(node) ||
		isConstructorDeclaration(node) ||
		isAccessorDeclaration(node) ||
		isFunctionExpression(node) ||
		isArrowFunction(node)
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
		isImportClause(node) ||
		isImportEqualsDeclaration(node) ||
		isNamespaceImport(node) ||
		ts.isImportOrExportSpecifier(node)
	);
}
export function isTypeReferenceType(
	node: ts.Node
): node is ts.TypeReferenceType {
	return isTypeReferenceNode(node) || isExpressionWithTypeArguments(node);
}
export function isUnionOrIntersectionTypeNode(
	node: ts.Node
): node is ts.UnionOrIntersectionTypeNode {
	return isUnionTypeNode(node) || isIntersectionTypeNode(node);
}
export function isUnparsedSourceText(
	node: ts.Node
): node is ts.UnparsedSourceText {
	return isUnparsedPrepend(node) || isUnparsedTextLike(node);
}
export function isVariableLikeDeclaration(
	node: ts.Node
): node is ts.VariableLikeDeclaration {
	return (
		isVariableDeclaration(node) ||
		isParameterDeclaration(node) ||
		isBindingElement(node) ||
		isPropertyDeclaration(node) ||
		isPropertyAssignment(node) ||
		isPropertySignature(node) ||
		isJsxAttribute(node) ||
		isShorthandPropertyAssignment(node) ||
		isEnumMember(node) ||
		isJSDocPropertyTag(node) ||
		isJSDocParameterTag(node)
	);
}

export {
	isAssertionExpression,
	isAssertionKey,
	isBindingName,
	isBreakOrContinueStatement,
	isCallLikeExpression,
	isCaseOrDefaultClause,
	isEntityName,
	isFunctionOrConstructorTypeNode,
	isImportOrExportSpecifier,
	isJsxOpeningLikeElement,
	isMemberName,
	isModifier,
	isModifierLike,
	isNamedExportBindings,
	isObjectLiteralElementLike,
	isOptionalChain,
	isPropertyName,
	isStringLiteralLike,
	isTemplateLiteral,
	isTemplateLiteralToken,
	isUnparsedNode,
} from "typescript";
