module.exports = {
	env: {
		es2022: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:eslint-comments/recommended",
		"plugin:jsdoc/recommended-error",
		"plugin:regexp/recommended",
		"prettier",
	],
	overrides: [
		{
			extends: ["plugin:markdown/recommended"],
			files: ["**/*.{md}"],
			processor: "markdown/markdown",
		},
		{
			extends: [
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
				"plugin:typescript-sort-keys/recommended",
				"plugin:@typescript-eslint/strict",
			],
			files: ["**/*.{ts,tsx}"],
			parserOptions: {
				project: "./tsconfig.eslint.json",
			},
			rules: {
				// These off-by-default rules work well for this repo and we like them on.
				"deprecation/deprecation": "error",
				"@typescript-eslint/explicit-module-boundary-types": "error",

				// TODO?
				"@typescript-eslint/no-non-null-assertion": "off",
				"@typescript-eslint/no-unnecessary-condition": "off",
				"no-constant-condition": "off",
			},
		},
		{
			files: "*.json",
			excludedFiles: ["package.json"],
			parser: "jsonc-eslint-parser",
			rules: {
				"jsonc/sort-keys": "error",
			},
			extends: ["plugin:jsonc/recommended-with-json"],
		},
		{
			files: "**/*.test.ts",
			rules: {
				"@typescript-eslint/no-unsafe-assignment": "off",
				"@typescript-eslint/no-unsafe-call": "off",
			},
		},
	],
	parser: "@typescript-eslint/parser",
	plugins: [
		"@typescript-eslint",
		"deprecation",
		"import",
		"jsdoc",
		"no-only-tests",
		"regexp",
		"simple-import-sort",
		"typescript-sort-keys",
		"vitest",
	],
	root: true,
	rules: {
		// These off-by-default rules work well for this repo and we like them on.
		"import/extensions": ["error", "ignorePackages"],
		"no-only-tests/no-only-tests": "error",
		"simple-import-sort/exports": "error",
		"simple-import-sort/imports": "error",

		// These on-by-default rules don't work well for this repo and we like them off.
		"no-inner-declarations": "off",

		// JSDoc rules
		"jsdoc/check-indentation": "error",
		"jsdoc/check-line-alignment": "error",
		"jsdoc/check-tag-names": [
			"error",
			{
				definedTags: ["category"],
			},
		],
		"jsdoc/no-bad-blocks": "error",
		"jsdoc/no-defaults": "error",
		"jsdoc/no-types": "error",
		"jsdoc/require-asterisk-prefix": "error",
		"jsdoc/require-description": "error",
		"jsdoc/require-hyphen-before-param-description": "error",
		"jsdoc/require-throws": "error",
		"jsdoc/tag-lines": [
			"error",
			"never",
			{
				noEndLines: true,
				tags: {
					example: { lines: "always" },
				},
			},
		],
		"jsdoc/require-jsdoc": "off",
		"jsdoc/require-param-type": "off",
		"jsdoc/require-param": "off",
		"jsdoc/require-property-type": "off",
		"jsdoc/require-property": "off",
		"jsdoc/require-returns-type": "off",
		"jsdoc/require-returns": "off",
	},
	settings: {
		jsdoc: {
			ignoreInternal: true,
		},
	},
};
