// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import ts from "typescript";

import { isNumericOrStringLikeLiteral } from "../nodes/typeGuards/compound";

function unwrapParentheses(node: ts.Expression) {
	while (node.kind === ts.SyntaxKind.ParenthesizedExpression) {
		node = (node as ts.ParenthesizedExpression).expression;
	}

	return node;
}

export function getPropertyName(
	propertyName: ts.PropertyName,
): string | undefined {
	if (propertyName.kind === ts.SyntaxKind.ComputedPropertyName) {
		const expression = unwrapParentheses(propertyName.expression);
		if (ts.isPrefixUnaryExpression(expression)) {
			let negate = false;
			switch (expression.operator) {
				case ts.SyntaxKind.MinusToken:
					negate = true;
				// falls through
				case ts.SyntaxKind.PlusToken:
					return ts.isNumericLiteral(expression.operand)
						? `${negate ? "-" : ""}${expression.operand.text}`
						: ts.isBigIntLiteral(expression.operand)
							? `${negate ? "-" : ""}${expression.operand.text.slice(0, -1)}`
							: undefined;
				default:
					return;
			}
		}

		if (ts.isBigIntLiteral(expression)) {
			return expression.text.slice(0, -1);
		}

		if (isNumericOrStringLikeLiteral(expression)) {
			return expression.text;
		}

		return;
	}

	return propertyName.kind === ts.SyntaxKind.PrivateIdentifier
		? undefined
		: propertyName.text;
}
