// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import ts from "typescript";

import { isTransientSymbolLinksFlagSet } from "../flags";
import {
	isConstAssertionExpression,
	isEntityNameExpression,
	isNumericOrStringLikeLiteral,
} from "./typeGuards";

/**
 * Determines whether a call to {@link Object.defineProperty} is statically analyzable.
 * @internal
 */
export function isBindableObjectDefinePropertyCall(
	node: ts.CallExpression,
): boolean {
	return (
		node.arguments.length === 3 &&
		isEntityNameExpression(node.arguments[0]) &&
		isNumericOrStringLikeLiteral(node.arguments[1]) &&
		ts.isPropertyAccessExpression(node.expression) &&
		node.expression.name.escapedText === "defineProperty" &&
		ts.isIdentifier(node.expression.expression) &&
		node.expression.expression.escapedText === "Object"
	);
}

/**
 * Detects whether the property assignment is affected by an enclosing `as const` assertion or const type parameter and therefore treated literally.
 * @internal
 */
export function isInConstContext(
	node: ts.PropertyAssignment | ts.ShorthandPropertyAssignment,
	typeChecker: ts.TypeChecker,
): boolean {
	let current: ts.Node = node;
	while (true) {
		const parent = current.parent;
		outer: switch (parent.kind) {
			case ts.SyntaxKind.ArrayLiteralExpression:
			case ts.SyntaxKind.ObjectLiteralExpression:
			case ts.SyntaxKind.ParenthesizedExpression:
			case ts.SyntaxKind.TemplateExpression:
				current = parent;
				break;
			case ts.SyntaxKind.AsExpression:
			case ts.SyntaxKind.TypeAssertionExpression:
				return isConstAssertionExpression(parent as ts.AssertionExpression);
			case ts.SyntaxKind.CallExpression: {
				if (!ts.isExpression(current)) {
					return false;
				}

				const functionSignature = typeChecker.getResolvedSignature(
					parent as ts.CallExpression,
				);
				if (functionSignature === undefined) {
					return false;
				}

				const argumentIndex = (parent as ts.CallExpression).arguments.indexOf(
					current,
				);
				if (argumentIndex < 0) {
					return false;
				}

				const parameterSymbol =
					functionSignature.getParameters()[argumentIndex];
				if (parameterSymbol === undefined || !("links" in parameterSymbol)) {
					return false;
				}

				const parameterSymbolLinks = (parameterSymbol as ts.TransientSymbol)
					.links;

				const propertySymbol =
					parameterSymbolLinks.type?.getProperties()?.[argumentIndex];
				if (propertySymbol === undefined || !("links" in propertySymbol)) {
					return false;
				}

				// I believe we only need to check one level deep, regardless of how deep `node` is.
				return (
					!!propertySymbol.links &&
					isTransientSymbolLinksFlagSet(
						(propertySymbol as ts.TransientSymbol).links,
						ts.CheckFlags.Readonly,
					)
				);
			}
			case ts.SyntaxKind.PrefixUnaryExpression:
				if (current.kind !== ts.SyntaxKind.NumericLiteral) {
					return false;
				}

				switch ((parent as ts.PrefixUnaryExpression).operator) {
					case ts.SyntaxKind.MinusToken:
					case ts.SyntaxKind.PlusToken:
						current = parent;
						break outer;
					default:
						return false;
				}
			case ts.SyntaxKind.PropertyAssignment:
				if ((parent as ts.PropertyAssignment).initializer !== current) {
					return false;
				}

				current = parent.parent!;
				break;
			case ts.SyntaxKind.ShorthandPropertyAssignment:
				current = parent.parent!;
				break;
			default:
				return false;
		}
	}
}
