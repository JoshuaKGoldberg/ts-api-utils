import * as ts from "typescript";

const [tsMajor, tsMinor] = ts.versionMajorMinor
	.split(".")
	.map((raw) => Number.parseInt(raw, 10));

export function isTsVersionAtLeast(major: number, minor = 0): boolean {
	return major > tsMajor || (major === tsMajor && minor >= tsMinor);
}
