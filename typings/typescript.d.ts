import "typescript";

declare module "typescript" {
	// internal TS APIs

	const enum CheckFlags {
		Readonly = 1 << 3,
	}

	interface SymbolLinks {
		type?: Type;
	}

	// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
	interface TransientSymbol extends Symbol {
		links: TransientSymbolLinks;
	}

	interface TransientSymbolLinks extends SymbolLinks {
		// https://github.com/microsoft/TypeScript/issues/58656
		checkFlags: CheckFlags;
	}
}
