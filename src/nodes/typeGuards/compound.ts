import ts from "typescript";

import { isSuperExpression } from "./single.js";
import {
	isDeclarationName,
	isEntityNameExpression,
	isJSDocNamespaceBody,
	isJsxTagNameExpression,
	isNamespaceBody,
} from "./union.js";

/**
 * An `AssertionExpression` that is declared as const.
 * @category Node Types
 */
export type ConstAssertionExpression = ts.AssertionExpression & {
	type: ts.TypeReferenceNode;
	typeName: ConstAssertionIdentifier;
};

/**
 * An `Identifier` with an `escapedText` value of `"const"`.
 * @category Node Types
 */
export type ConstAssertionIdentifier = ts.Identifier & {
	escapedText: ts.__String & "const";
};

/**
 * Test if a node is a {@link ConstAssertionExpression}.
 * @category Nodes - Type Guards
 * @example
 * ```ts
 * declare const node: ts.Node;
 *
 * if (isConstAssertionExpression(node)) {
 *   // ...
 * }
 * ```
 * @returns Whether the given node appears to be a {@link ConstAssertionExpression}.
 */
export function isConstAssertionExpression(
	node: ts.AssertionExpression,
): node is ConstAssertionExpression {
	return (
		ts.isTypeReferenceNode(node.type) &&
		ts.isIdentifier(node.type.typeName) &&
		node.type.typeName.escapedText === "const"
	);
}

/**
 * Test if a node is an `IterationStatement`.
 * @category Nodes - Type Guards
 * @example
 * ```ts
 * declare const node: ts.Node;
 *
 * if (isIterationStatement(node)) {
 *   // ...
 * }
 * ```
 * @returns Whether the given node appears to be an `IterationStatement`.
 */
export function isIterationStatement(
	node: ts.Node,
): node is ts.IterationStatement {
	switch (node.kind) {
		case ts.SyntaxKind.DoStatement:
		case ts.SyntaxKind.ForInStatement:
		case ts.SyntaxKind.ForOfStatement:
		case ts.SyntaxKind.ForStatement:
		case ts.SyntaxKind.WhileStatement:
			return true;
		default:
			return false;
	}
}

/**
 * Test if a node is a `JSDocNamespaceDeclaration`.
 * @category Nodes - Type Guards
 * @example
 * ```ts
 * declare const node: ts.Node;
 *
 * if (isJSDocNamespaceDeclaration(node)) {
 *   // ...
 * }
 * ```
 * @returns Whether the given node appears to be a `JSDocNamespaceDeclaration`.
 */
export function isJSDocNamespaceDeclaration(
	node: ts.Node,
): node is ts.JSDocNamespaceDeclaration {
	return (
		ts.isModuleDeclaration(node) &&
		ts.isIdentifier(node.name) &&
		(node.body === undefined || isJSDocNamespaceBody(node.body))
	);
}

/**
 * Test if a node is a `JsxTagNamePropertyAccess`.
 * @category Nodes - Type Guards
 * @example
 * ```ts
 * declare const node: ts.Node;
 *
 * if (isJsxTagNamePropertyAccess(node)) {
 *   // ...
 * }
 * ```
 * @returns Whether the given node appears to be a `JsxTagNamePropertyAccess`.
 */
export function isJsxTagNamePropertyAccess(
	node: ts.Node,
): node is ts.JsxTagNamePropertyAccess {
	return (
		ts.isPropertyAccessExpression(node) &&
		// eslint-disable-next-line deprecation/deprecation -- Keep compatibility with ts < 5
		isJsxTagNameExpression(node.expression)
	);
}

/**
 * a `NamedDeclaration` that definitely has a name.
 * @category Node Types
 */
export interface NamedDeclarationWithName extends ts.NamedDeclaration {
	name: ts.DeclarationName;
}

/**
 * Test if a node is a {@link NamedDeclarationWithName}.
 * @category Nodes - Type Guards
 * @example
 * ```ts
 * declare const node: ts.Node;
 *
 * if (isNamedDeclarationWithName(node)) {
 *   // ...
 * }
 * ```
 * @returns Whether the given node appears to be a {@link NamedDeclarationWithName}.
 */
export function isNamedDeclarationWithName(
	node: ts.Declaration,
): node is NamedDeclarationWithName {
	return (
		"name" in node &&
		node.name !== undefined &&
		node.name !== null &&
		isDeclarationName(node.name as ts.Node)
	);
}

/**
 * Test if a node is a `NamespaceDeclaration`.
 * @category Nodes - Type Guards
 * @example
 * ```ts
 * declare const node: ts.Node;
 *
 * if (isNamespaceDeclaration(node)) {
 *   // ...
 * }
 * ```
 * @returns Whether the given node appears to be a `NamespaceDeclaration`.
 */
export function isNamespaceDeclaration(
	node: ts.Node,
): node is ts.NamespaceDeclaration {
	return (
		ts.isModuleDeclaration(node) &&
		ts.isIdentifier(node.name) &&
		node.body !== undefined &&
		isNamespaceBody(node.body)
	);
}

/**
 * A number or string-like literal.
 * @category Node Types
 */
export type NumericOrStringLikeLiteral =
	| ts.NumericLiteral
	| ts.StringLiteralLike;

/**
 * Test if a node is a {@link NumericOrStringLikeLiteral}.
 * @category Nodes - Type Guards
 * @example
 * ```ts
 * declare const node: ts.Node;
 *
 * if (isNumericOrStringLikeLiteral(node)) {
 *   // ...
 * }
 * ```
 * @returns Whether the given node appears to be a {@link NumericOrStringLikeLiteral}.
 */
export function isNumericOrStringLikeLiteral(
	node: ts.Node,
): node is NumericOrStringLikeLiteral {
	switch (node.kind) {
		case ts.SyntaxKind.StringLiteral:
		case ts.SyntaxKind.NumericLiteral:
		case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
			return true;
		default:
			return false;
	}
}

/**
 * Test if a node is a `PropertyAccessEntityNameExpression`.
 * @category Nodes - Type Guards
 * @example
 * ```ts
 * declare const node: ts.Node;
 *
 * if (isPropertyAccessEntityNameExpression(node)) {
 *   // ...
 * }
 * ```
 * @returns Whether the given node appears to be a `PropertyAccessEntityNameExpression`.
 */
export function isPropertyAccessEntityNameExpression(
	node: ts.Node,
): node is ts.PropertyAccessEntityNameExpression {
	return (
		ts.isPropertyAccessExpression(node) &&
		ts.isIdentifier(node.name) &&
		isEntityNameExpression(node.expression)
	);
}

/**
 * Test if a node is a `SuperElementAccessExpression`.
 * @category Nodes - Type Guards
 * @example
 * ```ts
 * declare const node: ts.Node;
 *
 * if (isSuperElementAccessExpression(node)) {
 *   // ...
 * }
 * ```
 * @returns Whether the given node appears to be a `SuperElementAccessExpression`.
 */
export function isSuperElementAccessExpression(
	node: ts.Node,
): node is ts.SuperElementAccessExpression {
	return (
		ts.isElementAccessExpression(node) && isSuperExpression(node.expression)
	);
}

/**
 * Test if a node is a `SuperPropertyAccessExpression`.
 * @category Nodes - Type Guards
 * @example
 * ```ts
 * declare const node: ts.Node;
 *
 * if (isSuperPropertyAccessExpression(node)) {
 *   // ...
 * }
 * ```
 * @returns Whether the given node appears to be a `SuperPropertyAccessExpression`.
 */
export function isSuperPropertyAccessExpression(
	node: ts.Node,
): node is ts.SuperPropertyAccessExpression {
	return (
		ts.isPropertyAccessExpression(node) && isSuperExpression(node.expression)
	);
}
