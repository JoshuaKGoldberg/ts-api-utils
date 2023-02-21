# Development

After [forking the repo from GitHub](https://help.github.com/articles/fork-a-repo) and [installing pnpm](https://pnpm.io/installation):

```shell
git clone https://github.com/<your-name-here>/ts-api-utils
cd ts-api-utils
pnpm install
```

> This repository includes a list of suggested VS Code extensions.
> It's a good idea to use [VS Code](https://code.visualstudio.com) and accept its suggestion to install them, as they'll help with development.

## Building

Run [tsup](https://tsup.egoist.dev) locally to type check and build source files from `src/` into output files in `lib/`.
Add `--watch` to run it continuously in a terminal:

```shell
pnpm build --watch
```

## Formatting

[Prettier](https://prettier.io) is used to format code.
It should be applied automatically when you save files in VS Code or make a Git commit.

## Linting

This package includes several forms of linting to enforce consistent code quality and styling.
Each should be shown in VS Code, and can be run manually on the command-line:

- `pnpm lint:docs` ([typedocs](https://typedoc.org/)): Checks that all the code is documented
- `pnpm lint:knip` ([knip](https://github.com/webpro/knip)): Detects unused files, dependencies, and code exports
- `pnpm lint:knip:production` ([knip](https://github.com/webpro/knip)): The same as `lint:knip` but looks purely at production code/dependencies
- `pnpm lint:md` ([Markdownlint](https://github.com/DavidAnson/markdownlint)): Checks Markdown source files
- `pnpm lint:package` ([npm-package-json-lint](https://npmpackagejsonlint.org/)): Lints the `package.json` file
- `pnpm lint:packages` ([pnpm-deduplicate](https://github.com/ocavue/pnpm-deduplicate)): Deduplicates packages in the `pnpm-lock.yml` file
- `pnpm lint:spelling` ([cspell](https://cspell.org)): Spell checks across all source files
- `pnpm lint` ([ESLint](https://eslint.org) with [typescript-eslint](https://typescript-eslint.io)): Lints JavaScript and TypeScript source files

## Testing

[Vitest](https://vitest.dev) is used for tests.
You can run it locally on the command-line:

```shell
pnpm run test
```

Add the `--coverage` flag to compute test coverage and place reports in the `coverage/` directory:

```shell
pnpm run test --coverage
```

## Type Checking

You can run the TypeScript compiler (`tsc`) with `pnpm type-check`.
Add `--watch` to have it run continuously:

```shell
pnpm type-check --watch
```

You should also see suggestions from TypeScript in your editor.

## Documentation

You can generate a [TypeDoc](https://typedoc.org) documentation site with `pnpm docs`.
To browse the docs locally you'll need a local webserver server (for VS Code users, we recommend [Live Preview](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server)).

## Publishing

Publishing will automatically happen when commits are pushed to the main branch.
The documentation site will also be automatically updated immediately after each new release.
