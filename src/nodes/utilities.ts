// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import ts from "typescript";

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
 * Detects whether an expression is affected by an enclosing `as const` assertion and therefore treated literally.
 * @internal
 */
export function isInConstContext(node: ts.Expression): boolean {
	let current: ts.Node = node;
	while (true) {
		const parent = current.parent;
		outer: switch (parent.kind) {
			case ts.SyntaxKind.TypeAssertionExpression:
			case ts.SyntaxKind.AsExpression:
				return isConstAssertionExpression(parent as ts.AssertionExpression);
			case ts.SyntaxKind.PrefixUnaryExpression:
				if (current.kind !== ts.SyntaxKind.NumericLiteral) {
					return false;
				}

				switch ((parent as ts.PrefixUnaryExpression).operator) {
					case ts.SyntaxKind.PlusToken:
					case ts.SyntaxKind.MinusToken:
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
			case ts.SyntaxKind.ParenthesizedExpression:
			case ts.SyntaxKind.ArrayLiteralExpression:
			case ts.SyntaxKind.ObjectLiteralExpression:
			case ts.SyntaxKind.TemplateExpression:
				current = parent;
				break;
			default:
				return false;
		}
	}
}
