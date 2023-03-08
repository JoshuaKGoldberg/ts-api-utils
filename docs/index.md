> Utility functions for working with TypeScript's API.
> Successor to the wonderful [tsutils](https://github.com/ajafff/tsutils).

`ts-api-utils` exports functions and types for working with TypeScript's node and type APIs.
If you're working with `ts.Node`s and/or `ts.Type`s, this package is your friend. 💗

## Installation

```shell
npm i ts-api-utils
```

```shell
yarn add ts-api-utils
```

```shell
pnpm add ts-api-utils
```

## Usage

```ts
import * as tsutils from "ts-api-utils";
```

The most commonly used functions are type predicates not yet available on TypeScript.
For example:

```ts
declare const node: ts.Node;

if (isAbstractKeyword(node)) {
	// ...
}
```

See the sidebar for the full list of available functions and types.
