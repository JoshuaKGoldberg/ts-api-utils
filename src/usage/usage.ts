// Code largely based on https://github.com/ajafff/tsutils
// Original license: https://github.com/ajafff/tsutils/blob/26b195358ec36d59f00333115aa3ffd9611ca78b/LICENSE

import * as ts from "typescript";

import { DeclarationDomain, DeclarationInfo } from "./declarations";
import { UsageDomain } from "./getUsageDomain";
import { Scope } from "./Scope";

export interface InternalUsageInfo {
	declarations: DeclarationInfo[];
	domain: DeclarationDomain;
	uses: Usage[];
}

/**
 * An instance of an item (type or value) being used.
 */
export interface Usage {
	/**
	 * Which space(s) the usage is within.
	 */
	domain: UsageDomain;
	location: ts.Identifier;
}

/**
 * How an item (type or value) was declared and/or referenced.
 */
export interface UsageInfo {
	/**
	 * Locations where the item was declared.
	 */
	declarations: ts.Identifier[];

	/**
	 * Which space(s) the item is within.
	 */
	domain: DeclarationDomain;

	/**
	 * Whether the item was exported from its module or namespace scope.
	 */
	exported: boolean;

	/**
	 * Whether the item's declaration was in the global scope.
	 */
	inGlobalScope: boolean;

	/**
	 * Each reference to the item in the file.
	 */
	uses: Usage[];
}

/**
 * Registers usage information for an identifier in a scope.
 */
export type UsageInfoCallback = (
	usageInfo: UsageInfo,
	key: ts.Identifier,
	scope: Scope,
) => void;
