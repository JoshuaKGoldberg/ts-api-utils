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
				"plugin:typescript-sort-keys/recommended",
				"plugin:@typescript-eslint/recommended-type-checked",
				"plugin:@typescript-eslint/strict-type-checked",
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
				"@typescript-eslint/prefer-literal-enum-member": "off",
				"@typescript-eslint/no-confusing-void-expression": "off",
				"@typescript-eslint/no-non-null-assertion": "off",
				"@typescript-eslint/no-unnecessary-condition": "off",
				"@typescript-eslint/no-unsafe-enum-comparison": "off",
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
		"unicorn",
		"vitest",
	],
	root: true,
	rules: {
		// These off-by-default rules work well for this repo and we like them on.
		"@typescript-eslint/no-unused-vars": [
			"error",
			{ argsIgnorePattern: "^_", caughtErrors: "all" },
		],
		"import/extensions": ["error"],
		"import/no-useless-path-segments": [
			"error",
			{
				noUselessIndex: true,
			},
		],
		"no-only-tests/no-only-tests": "error",
		"simple-import-sort/exports": "error",
		"simple-import-sort/imports": "error",
		"unicorn/import-style": [
			"error",
			{
				extendDefaultStyles: false,
				styles: {
					typescript: {
						default: true,
					},
				},
			},
		],

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
		"jsdoc/require-asterisk-prefix": "error",
		"jsdoc/require-description": "error",
		"jsdoc/require-hyphen-before-param-description": "error",
		"jsdoc/require-throws": "error",
		"jsdoc/tag-lines": [
			"error",
			"never",
			{
				endLines: 0,
				startLines: 1,
				tags: {
					example: { lines: "never" },
				},
			},
		],
		"jsdoc/require-jsdoc": "off",
		"jsdoc/require-param": "off",
		"jsdoc/require-property": "off",
		"jsdoc/require-returns": "off",
		// Todo: pending a "recommended-typescript" config in eslint-plugin-jsdoc
		// https://github.com/gajus/eslint-plugin-jsdoc/issues/615#issuecomment-1338669655
		"jsdoc/no-types": "error",
		"jsdoc/require-param-type": "off",
		"jsdoc/require-property-type": "off",
		"jsdoc/require-returns-type": "off",
	},
	settings: {
		jsdoc: {
			ignoreInternal: true,
		},
	},
};
