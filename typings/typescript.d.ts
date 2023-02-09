import "typescript";

declare module "typescript" {
	export function isExpression(node: Node): node is ts.Expression;
	export function isLeftHandSideExpression(
		node: Node
	): node is ts.LeftHandSideExpression;
}
