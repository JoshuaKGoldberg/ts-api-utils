import "typescript";

declare module "typescript" {
	// internal TS APIs

	interface SymbolLinks {
		type?: Type;
	}

	interface TransientSymbolLinks extends SymbolLinks {
		checkFlags: CheckFlags;
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	interface TransientSymbol extends Symbol {
		links: TransientSymbolLinks;
	}

	const enum CheckFlags {
		Readonly = 1 << 3,
	}
}
