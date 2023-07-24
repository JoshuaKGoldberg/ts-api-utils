import ts from "typescript";

/**
 * Test if a flow node is a `FlowStart`.
 *
 * @category Flow Nodes - Type Guards
 * @example
 * ```ts
 * declare const flowNode: ts.FlowNode;
 *
 * if (isFlowStart(flowNode)) {
 *   // ...
 * }
 * ```
 *
 * @returns Whether the given node appears to be a `FlowStart`.
 */
export function isFlowStart(flowNode: ts.FlowNode): flowNode is ts.FlowStart {
	return (
		"node" in flowNode &&
		(flowNode.node === undefined ||
			ts.isFunctionExpression(flowNode.node) ||
			ts.isArrowFunction(flowNode.node) ||
			ts.isMethodDeclaration(flowNode.node) ||
			ts.isGetAccessorDeclaration(flowNode.node) ||
			ts.isSetAccessorDeclaration(flowNode.node))
	);
}

/**
 * Test if a flow node is a `FlowLabel`.
 *
 * @category Flow Nodes - Type Guards
 * @example
 * ```ts
 * declare const flowNode: ts.FlowNode;
 *
 * if (isFlowLabel(flowNode)) {
 *   // ...
 * }
 * ```
 *
 * @returns Whether the given node appears to be a `FlowLabel`.
 */
export function isFlowLabel(flowNode: ts.FlowNode): flowNode is ts.FlowLabel {
	return "antecedents" in flowNode && !("antecedent" in flowNode);
}

/**
 * Test if a flow node is a `FlowAssignment`.
 *
 * @category Flow Nodes - Type Guards
 * @example
 * ```ts
 * declare const flowNode: ts.FlowNode;
 *
 * if (isFlowAssignment(flowNode)) {
 *   // ...
 * }
 * ```
 *
 * @returns Whether the given node appears to be a `FlowAssignment`.
 */
export function isFlowAssignment(
	flowNode: ts.FlowNode
): flowNode is ts.FlowAssignment {
	return (
		"node" in flowNode &&
		"antecedent" in flowNode &&
		!("antecedents" in flowNode) &&
		(ts.isExpression(flowNode.node) ||
			ts.isVariableDeclaration(flowNode.node) ||
			ts.isBindingElement(flowNode.node))
	);
}

/**
 * Test if a flow node is a `FlowCall`.
 *
 * @category Flow Nodes - Type Guards
 * @example
 * ```ts
 * declare const flowNode: ts.FlowNode;
 *
 * if (isFlowCall(flowNode)) {
 *   // ...
 * }
 * ```
 *
 * @returns Whether the given node appears to be a `FlowCall`.
 */
export function isFlowCall(flowNode: ts.FlowNode): flowNode is ts.FlowCall {
	return (
		"node" in flowNode &&
		"antecedent" in flowNode &&
		!("antecedents" in flowNode) &&
		ts.isCallExpression(flowNode.node)
	);
}

/**
 * Test if a flow node is a `FlowCondition`.
 *
 * @category Flow Nodes - Type Guards
 * @example
 * ```ts
 * declare const flowNode: ts.FlowNode;
 *
 * if (isFlowCondition(flowNode)) {
 *   // ...
 * }
 * ```
 *
 * @returns Whether the given node appears to be a `FlowCondition`.
 */
export function isFlowCondition(
	flowNode: ts.FlowNode
): flowNode is ts.FlowCondition {
	return (
		"node" in flowNode &&
		"antecedent" in flowNode &&
		!("antecedents" in flowNode) &&
		ts.isExpression(flowNode.node)
	);
}

/**
 * Test if a flow node is a `FlowSwitchClause`.
 *
 * @category Flow Nodes - Type Guards
 * @example
 * ```ts
 * declare const flowNode: ts.FlowNode;
 *
 * if (isFlowSwitchClause(flowNode)) {
 *   // ...
 * }
 * ```
 *
 * @returns Whether the given node appears to be a `FlowSwitchClause`.
 */
export function isFlowSwitchClause(
	flowNode: ts.FlowNode
): flowNode is ts.FlowSwitchClause {
	return (
		"switchStatement" in flowNode &&
		"clauseStart" in flowNode &&
		"clauseEnd" in flowNode &&
		"antecedent" in flowNode &&
		!("antecedents" in flowNode) &&
		ts.isSwitchStatement(flowNode.switchStatement)
	);
}

/**
 * Test if a flow node is a `FlowArrayMutation`.
 *
 * @category Flow Nodes - Type Guards
 * @example
 * ```ts
 * declare const flowNode: ts.FlowNode;
 *
 * if (isFlowArrayMutation(flowNode)) {
 *   // ...
 * }
 * ```
 *
 * @returns Whether the given node appears to be a `FlowArrayMutation`.
 */
export function isFlowArrayMutation(
	flowNode: ts.FlowNode
): flowNode is ts.FlowArrayMutation {
	return (
		"node" in flowNode &&
		"antecedent" in flowNode &&
		!("antecedents" in flowNode) &&
		(ts.isCallExpression(flowNode.node) || ts.isBinaryExpression(flowNode.node))
	);
}

/**
 * Test if a flow node is a `FlowReduceLabel`.
 *
 * @category Flow Nodes - Type Guards
 * @example
 * ```ts
 * declare const flowNode: ts.FlowNode;
 *
 * if (isFlowReduceLabel(flowNode)) {
 *   // ...
 * }
 * ```
 *
 * @returns Whether the given node appears to be a `FlowReduceLabel`.
 */
export function isFlowReduceLabel(
	flowNode: ts.FlowNode
): flowNode is ts.FlowReduceLabel {
	return (
		"target" in flowNode &&
		"antecedents" in flowNode &&
		"antecedent" in flowNode
	);
}
