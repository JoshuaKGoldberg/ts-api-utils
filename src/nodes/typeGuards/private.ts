/**
 * @file safe version of type guards that exists in TypeScript's private API.
 */

import ts from "typescript";

import { isPartOfTypeNode } from "../utilities.js";
import {
	isAnyKeyword,
	isBigIntKeyword,
	isBooleanKeyword,
	isFalseKeyword,
	isImportKeyword,
	isInKeyword,
	isNeverKeyword,
	isNullKeyword,
	isNumberKeyword,
	isObjectKeyword,
	isStringKeyword,
	isSuperKeyword,
	isSymbolKeyword,
	isThisKeyword,
	isTrueKeyword,
	isUndefinedKeyword,
	isUnknownKeyword,
	isVoidKeyword,
} from "./single.js";

export function isExpression(node: ts.Node): node is ts.Expression {
	return (
		ts.isConditionalExpression(node) ||
		ts.isYieldExpression(node) ||
		ts.isArrowFunction(node) ||
		ts.isBinaryExpression(node) ||
		ts.isSpreadElement(node) ||
		ts.isAsExpression(node) ||
		ts.isOmittedExpression(node) ||
		ts.isCommaListExpression(node) ||
		ts.isPartiallyEmittedExpression(node) ||
		ts.isSatisfiesExpression(node) ||
		isUnaryExpression(node)
	);
}

export function isExpressionNode(node: ts.Node): boolean {
	if (
		isSuperKeyword(node) ||
		isNullKeyword(node) ||
		isTrueKeyword(node) ||
		isFalseKeyword(node) ||
		ts.isRegularExpressionLiteral(node) ||
		ts.isArrayLiteralExpression(node) ||
		ts.isObjectLiteralExpression(node) ||
		ts.isPropertyAccessExpression(node) ||
		ts.isElementAccessExpression(node) ||
		ts.isCallExpression(node) ||
		ts.isNewExpression(node) ||
		ts.isTaggedTemplateExpression(node) ||
		ts.isAsExpression(node) ||
		ts.isTypeAssertionExpression(node) ||
		ts.isSatisfiesExpression(node) ||
		ts.isNonNullExpression(node) ||
		ts.isParenthesizedExpression(node) ||
		ts.isFunctionExpression(node) ||
		ts.isClassExpression(node) ||
		ts.isArrowFunction(node) ||
		ts.isVoidExpression(node) ||
		ts.isDeleteExpression(node) ||
		ts.isTypeOfExpression(node) ||
		ts.isPrefixUnaryExpression(node) ||
		ts.isPostfixUnaryExpression(node) ||
		ts.isBinaryExpression(node) ||
		ts.isConditionalExpression(node) ||
		ts.isSpreadElement(node) ||
		ts.isTemplateExpression(node) ||
		ts.isOmittedExpression(node) ||
		ts.isJsxElement(node) ||
		ts.isJsxSelfClosingElement(node) ||
		ts.isJsxFragment(node) ||
		ts.isYieldExpression(node) ||
		ts.isAwaitExpression(node) ||
		ts.isMetaProperty(node)
	) {
		return true;
	}

	if (ts.SyntaxKind.ExpressionWithTypeArguments) {
		return !ts.isHeritageClause(node.parent);
	}

	if (ts.SyntaxKind.QualifiedName) {
		while (ts.isQualifiedName(node.parent)) {
			node = node.parent;
		}
		return (
			ts.isTypeQueryNode(node.parent) ||
			ts.isJSDocLinkLike(node.parent) ||
			ts.isJSDocNameReference(node.parent) ||
			ts.isJSDocMemberName(node.parent) ||
			isJSXTagName(node)
		);
	}

	if (ts.SyntaxKind.JSDocMemberName) {
		while (ts.isJSDocMemberName(node.parent)) {
			node = node.parent;
		}
		return (
			ts.isTypeQueryNode(node.parent) ||
			ts.isJSDocLinkLike(node.parent) ||
			ts.isJSDocNameReference(node.parent) ||
			ts.isJSDocMemberName(node.parent) ||
			isJSXTagName(node)
		);
	}

	if (ts.SyntaxKind.PrivateIdentifier) {
		return (
			ts.isBinaryExpression(node.parent) &&
			node.parent.left === node &&
			isInKeyword(node.parent.operatorToken)
		);
	}

	if (ts.SyntaxKind.Identifier) {
		if (
			node.parent.kind === ts.SyntaxKind.TypeQuery ||
			ts.isJSDocLinkLike(node.parent) ||
			ts.isJSDocNameReference(node.parent) ||
			ts.isJSDocMemberName(node.parent) ||
			isJSXTagName(node)
		) {
			return true;
		}
	}

	if (
		ts.isNumericLiteral(node) ||
		ts.isBigIntLiteral(node) ||
		ts.isStringLiteral(node) ||
		ts.isNoSubstitutionTemplateLiteral(node) ||
		isThisKeyword(node)
	) {
		return isInExpressionContext(node);
	}

	return false;
}

export function isUnaryExpression(node: ts.Node): node is ts.UnaryExpression {
	return (
		ts.isPrefixUnaryExpression(node) ||
		ts.isPostfixUnaryExpression(node) ||
		ts.isDeleteExpression(node) ||
		ts.isTypeOfExpression(node) ||
		ts.isVoidExpression(node) ||
		ts.isAwaitExpression(node) ||
		ts.isTypeAssertionExpression(node) ||
		isLeftHandSideExpression(node)
	);
}

export function isLeftHandSideExpression(
	node: ts.Node
): node is ts.LeftHandSideExpression {
	if (
		ts.isPropertyAccessExpression(node) ||
		ts.isElementAccessExpression(node) ||
		ts.isNewExpression(node) ||
		ts.isCallExpression(node) ||
		ts.isJsxElement(node) ||
		ts.isJsxSelfClosingElement(node) ||
		ts.isJsxFragment(node) ||
		ts.isTaggedTemplateExpression(node) ||
		ts.isArrayLiteralExpression(node) ||
		ts.isParenthesizedExpression(node) ||
		ts.isObjectLiteralExpression(node) ||
		ts.isClassExpression(node) ||
		ts.isFunctionExpression(node) ||
		ts.isIdentifier(node) ||
		ts.isRegularExpressionLiteral(node) ||
		ts.isNumericLiteral(node) ||
		ts.isBigIntLiteral(node) ||
		ts.isStringLiteral(node) ||
		ts.isNoSubstitutionTemplateLiteral(node) ||
		ts.isTemplateExpression(node) ||
		isFalseKeyword(node) ||
		isNullKeyword(node) ||
		isThisKeyword(node) ||
		isTrueKeyword(node) ||
		isSuperKeyword(node) ||
		ts.isNonNullExpression(node) ||
		ts.isExpressionWithTypeArguments(node) ||
		ts.isMetaProperty(node)
	) {
		return true;
	}

	// PrivateIdentifier is only an Expression if it's in a `#field in expr` BinaryExpression
	if (ts.isPrivateIdentifier(node)) {
		return (
			ts.isBinaryExpression(node.parent) &&
			node.parent.left === node &&
			isInKeyword(node.parent.operatorToken)
		);
	}

	// ImportKeyword is only an Expression if it's in a CallExpression
	if (isImportKeyword(node)) {
		return ts.isCallExpression(node.parent) && node.parent.expression === node;
	}

	return false;
}

export function isJSXTagName(node: ts.Node): node is ts.JsxTagNameExpression {
	if (
		ts.isJsxOpeningElement(node.parent) ||
		ts.isJsxSelfClosingElement(node.parent) ||
		ts.isJsxClosingElement(node.parent)
	) {
		return node.parent.tagName === node;
	}
	return false;
}

function isInExpressionContext(node: ts.Node) {
	if (
		ts.isVariableDeclaration(node.parent) ||
		ts.isParameter(node.parent) ||
		ts.isPropertyDeclaration(node.parent) ||
		ts.isEnumMember(node.parent) ||
		ts.isPropertyAssignment(node.parent) ||
		ts.isBindingElement(node.parent)
	) {
		return node.parent.initializer === node;
	}

	if (
		ts.isExpressionStatement(node.parent) ||
		ts.isIfStatement(node.parent) ||
		ts.isDoStatement(node.parent) ||
		ts.isWhileStatement(node.parent) ||
		ts.isReturnStatement(node.parent) ||
		ts.isWithStatement(node.parent) ||
		ts.isSwitchStatement(node.parent) ||
		ts.isCaseClause(node.parent) ||
		ts.isThrowStatement(node.parent) ||
		ts.isTypeAssertionExpression(node.parent) ||
		ts.isAsExpression(node.parent) ||
		ts.isTemplateSpan(node.parent) ||
		ts.isComputedPropertyName(node.parent) ||
		ts.isSatisfiesExpression(node.parent)
	) {
		return node.parent.expression === node;
	}

	if (ts.isForStatement(node.parent)) {
		return (
			(node.parent.initializer === node &&
				ts.isVariableDeclarationList(node.parent.initializer)) ||
			node.parent.condition === node ||
			node.parent.incrementor === node
		);
	}

	if (ts.isForInStatement(node.parent) || ts.isForOfStatement(node.parent)) {
		return (
			(node.parent.initializer === node &&
				ts.isVariableDeclarationList(node.parent.initializer)) ||
			node.parent.expression === node
		);
	}

	if (
		ts.isDecorator(node.parent) ||
		ts.isJsxExpression(node.parent) ||
		ts.isJsxSpreadAttribute(node.parent) ||
		ts.isSpreadAssignment(node.parent)
	) {
		return true;
	}

	if (ts.isExpressionWithTypeArguments(node.parent)) {
		return node.parent.expression === node && !isPartOfTypeNode(node.parent);
	}

	if (ts.isShorthandPropertyAssignment(node.parent)) {
		return node.parent.objectAssignmentInitializer === node;
	}

	return isExpressionNode(node.parent);
}

export function isTypeNode(node: ts.Node): node is ts.TypeNode {
	return (
		(node.kind >= ts.SyntaxKind.FirstTypeNode &&
			node.kind <= ts.SyntaxKind.LastTypeNode) ||
		isAnyKeyword(node) ||
		isUnknownKeyword(node) ||
		isNumberKeyword(node) ||
		isBigIntKeyword(node) ||
		isObjectKeyword(node) ||
		isBooleanKeyword(node) ||
		isStringKeyword(node) ||
		isSymbolKeyword(node) ||
		isVoidKeyword(node) ||
		isUndefinedKeyword(node) ||
		isNeverKeyword(node) ||
		ts.isExpressionWithTypeArguments(node) ||
		ts.isJSDocAllType(node) ||
		ts.isJSDocUnknownType(node) ||
		ts.isJSDocNullableType(node) ||
		ts.isJSDocNonNullableType(node) ||
		ts.isJSDocOptionalType(node) ||
		ts.isJSDocFunctionType(node) ||
		ts.isJSDocVariadicType(node)
	);
}
