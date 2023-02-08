import "typescript";

declare module "typescript" {
	export function isExpression(node: Node): boolean;
	export function isExpressionNode(node: Node): boolean;
	export function isLeftHandSideExpression(node: Node): boolean;
}
