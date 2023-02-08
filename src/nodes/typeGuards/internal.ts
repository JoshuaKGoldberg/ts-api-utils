/**
 * @file
 *
 * Type guards defined in TypeScript itself that aren't publicly exposed, but we need access to.
 */

import * as ts from "typescript";

export const isExpression = ts.isExpression as (
	node: ts.Node
) => node is ts.Expression;

export type ExpressionNode =
	| ts.ArrayLiteralExpression
	| ts.ArrowFunction
	| ts.AsExpression
	| ts.AwaitExpression
	| ts.BigIntLiteral
	| ts.BinaryExpression
	| ts.CallExpression
	| ts.ClassExpression
	| ts.ConditionalExpression
	| ts.DeleteExpression
	| ts.ElementAccessExpression
	| ts.ExpressionWithTypeArguments
	| ts.FalseLiteral
	| ts.FunctionExpression
	| ts.Identifier
	| ts.JSDocMemberName
	| ts.JsxElement
	| ts.JsxFragment
	| ts.JsxSelfClosingElement
	| ts.MetaProperty
	| ts.NewExpression
	| ts.NonNullExpression
	| ts.NoSubstitutionTemplateLiteral
	| ts.NullLiteral
	| ts.NumericLiteral
	| ts.ObjectLiteralExpression
	| ts.OmittedExpression
	| ts.ParenthesizedExpression
	| ts.PostfixUnaryExpression
	| ts.PrefixUnaryExpression
	| ts.PrivateIdentifier
	| ts.PropertyAccessExpression
	| ts.QualifiedName
	| ts.RegularExpressionLiteral
	| ts.SatisfiesExpression
	| ts.SpreadElement
	| ts.StringLiteral
	| ts.SuperExpression
	| ts.TaggedTemplateExpression
	| ts.TemplateExpression
	| ts.ThisExpression
	| ts.TrueLiteral
	| ts.TypeAssertion
	| ts.TypeOfExpression
	| ts.VoidExpression
	| ts.YieldExpression;

export const isExpressionNode = ts.isExpressionNode as (
	node: ts.Node
) => node is ExpressionNode;

export const isLeftHandSideExpression = ts.isLeftHandSideExpression as (
	node: ts.Node
) => node is ts.LeftHandSideExpression;
