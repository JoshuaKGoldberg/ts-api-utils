// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import ts from "typescript";

import { isAssignmentKind } from "../syntax";

/* eslint-disable perfectionist/sort-enums */
/**
 * What operations(s), if any, an expression applies.
 */
export enum AccessKind {
	None = 0,
	Read = 1 << 0,
	Write = 1 << 1,
	Delete = 1 << 2,
	ReadWrite = Read | Write,
	/* eslint-enable perfectionist/sort-enums */
}

/**
 * Determines which operation(s), if any, an expression applies.
 * @example
 * ```ts
 * declare const node: ts.Expression;
 *
 * if (getAccessKind(node).Write & AccessKind.Write) !== 0) {
 *   // this is a reassignment (write)
 * }
 * ```
 */
export function getAccessKind(node: ts.Expression): AccessKind {
	const parent = node.parent;
	switch (parent.kind) {
		case ts.SyntaxKind.DeleteExpression:
			return AccessKind.Delete;
		case ts.SyntaxKind.PostfixUnaryExpression:
			return AccessKind.ReadWrite;
		case ts.SyntaxKind.PrefixUnaryExpression:
			return (parent as ts.PrefixUnaryExpression).operator ===
				ts.SyntaxKind.PlusPlusToken ||
				(parent as ts.PrefixUnaryExpression).operator ===
					ts.SyntaxKind.MinusMinusToken
				? AccessKind.ReadWrite
				: AccessKind.Read;
		case ts.SyntaxKind.BinaryExpression:
			return (parent as ts.BinaryExpression).right === node
				? AccessKind.Read
				: !isAssignmentKind((parent as ts.BinaryExpression).operatorToken.kind)
					? AccessKind.Read
					: (parent as ts.BinaryExpression).operatorToken.kind ===
						  ts.SyntaxKind.EqualsToken
						? AccessKind.Write
						: AccessKind.ReadWrite;
		case ts.SyntaxKind.ShorthandPropertyAssignment:
			return (parent as ts.ShorthandPropertyAssignment)
				.objectAssignmentInitializer === node
				? AccessKind.Read
				: isInDestructuringAssignment(parent as ts.ShorthandPropertyAssignment)
					? AccessKind.Write
					: AccessKind.Read;
		case ts.SyntaxKind.PropertyAssignment:
			return (parent as ts.PropertyAssignment).name === node
				? AccessKind.None
				: isInDestructuringAssignment(parent as ts.PropertyAssignment)
					? AccessKind.Write
					: AccessKind.Read;
		case ts.SyntaxKind.ArrayLiteralExpression:
		case ts.SyntaxKind.SpreadElement:
		case ts.SyntaxKind.SpreadAssignment:
			return isInDestructuringAssignment(
				parent as
					| ts.ArrayLiteralExpression
					| ts.SpreadAssignment
					| ts.SpreadElement,
			)
				? AccessKind.Write
				: AccessKind.Read;
		case ts.SyntaxKind.ParenthesizedExpression:
		case ts.SyntaxKind.NonNullExpression:
		case ts.SyntaxKind.TypeAssertionExpression:
		case ts.SyntaxKind.AsExpression:
			// (<number>foo! as {})++
			return getAccessKind(parent as ts.Expression);
		case ts.SyntaxKind.ForOfStatement:
		case ts.SyntaxKind.ForInStatement:
			return (parent as ts.ForInOrOfStatement).initializer === node
				? AccessKind.Write
				: AccessKind.Read;
		case ts.SyntaxKind.ExpressionWithTypeArguments:
			return (
				(parent as ts.ExpressionWithTypeArguments).parent as ts.HeritageClause
			).token === ts.SyntaxKind.ExtendsKeyword &&
				parent.parent.parent.kind !== ts.SyntaxKind.InterfaceDeclaration
				? AccessKind.Read
				: AccessKind.None;
		case ts.SyntaxKind.ComputedPropertyName:
		case ts.SyntaxKind.ExpressionStatement:
		case ts.SyntaxKind.TypeOfExpression:
		case ts.SyntaxKind.ElementAccessExpression:
		case ts.SyntaxKind.ForStatement:
		case ts.SyntaxKind.IfStatement:
		case ts.SyntaxKind.DoStatement:
		case ts.SyntaxKind.WhileStatement:
		case ts.SyntaxKind.SwitchStatement:
		case ts.SyntaxKind.WithStatement:
		case ts.SyntaxKind.ThrowStatement:
		case ts.SyntaxKind.CallExpression:
		case ts.SyntaxKind.NewExpression:
		case ts.SyntaxKind.TaggedTemplateExpression:
		case ts.SyntaxKind.JsxExpression:
		case ts.SyntaxKind.Decorator:
		case ts.SyntaxKind.TemplateSpan:
		case ts.SyntaxKind.JsxOpeningElement:
		case ts.SyntaxKind.JsxSelfClosingElement:
		case ts.SyntaxKind.JsxSpreadAttribute:
		case ts.SyntaxKind.VoidExpression:
		case ts.SyntaxKind.ReturnStatement:
		case ts.SyntaxKind.AwaitExpression:
		case ts.SyntaxKind.YieldExpression:
		case ts.SyntaxKind.ConditionalExpression:
		case ts.SyntaxKind.CaseClause:
		case ts.SyntaxKind.JsxElement:
			return AccessKind.Read;
		case ts.SyntaxKind.ArrowFunction:
			return (parent as ts.ArrowFunction).body === node
				? AccessKind.Read
				: AccessKind.Write;
		case ts.SyntaxKind.PropertyDeclaration:
		case ts.SyntaxKind.VariableDeclaration:
		case ts.SyntaxKind.Parameter:
		case ts.SyntaxKind.EnumMember:
		case ts.SyntaxKind.BindingElement:
		case ts.SyntaxKind.JsxAttribute:
			return (parent as ts.JsxAttribute).initializer === node
				? AccessKind.Read
				: AccessKind.None;
		case ts.SyntaxKind.PropertyAccessExpression:
			return (parent as ts.PropertyAccessExpression).expression === node
				? AccessKind.Read
				: AccessKind.None;
		case ts.SyntaxKind.ExportAssignment:
			return (parent as ts.ExportAssignment).isExportEquals
				? AccessKind.Read
				: AccessKind.None;
	}

	return AccessKind.None;
}

function isInDestructuringAssignment(
	node:
		| ts.ArrayLiteralExpression
		| ts.ObjectLiteralExpression
		| ts.PropertyAssignment
		| ts.ShorthandPropertyAssignment
		| ts.SpreadAssignment
		| ts.SpreadElement,
): boolean {
	switch (node.kind) {
		case ts.SyntaxKind.ShorthandPropertyAssignment:
			if (node.objectAssignmentInitializer !== undefined) {
				return true;
			}

		// falls through
		case ts.SyntaxKind.PropertyAssignment:
		case ts.SyntaxKind.SpreadAssignment:
			node = node.parent as
				| ts.ArrayLiteralExpression
				| ts.ObjectLiteralExpression;
			break;
		case ts.SyntaxKind.SpreadElement:
			if (node.parent.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
				return false;
			}

			node = node.parent;
	}

	while (true) {
		switch (node.parent.kind) {
			case ts.SyntaxKind.BinaryExpression:
				return (
					(node.parent as ts.BinaryExpression).left === node &&
					(node.parent as ts.BinaryExpression).operatorToken.kind ===
						ts.SyntaxKind.EqualsToken
				);
			case ts.SyntaxKind.ForOfStatement:
				return (node.parent as ts.ForOfStatement).initializer === node;
			case ts.SyntaxKind.ArrayLiteralExpression:
			case ts.SyntaxKind.ObjectLiteralExpression:
				node = node.parent as
					| ts.ArrayLiteralExpression
					| ts.ObjectLiteralExpression;
				break;
			case ts.SyntaxKind.SpreadAssignment:
			case ts.SyntaxKind.PropertyAssignment:
				node = node.parent.parent as ts.ObjectLiteralExpression;
				break;
			case ts.SyntaxKind.SpreadElement:
				if (node.parent.parent.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
					return false;
				}

				node = node.parent.parent as ts.ArrayLiteralExpression;
				break;
			default:
				return false;
		}
	}
}
