import ts from "typescript";
import tsvfs from "@typescript/vfs";

export function getSourceFileAndTypeChecker(
	textContent: string,
	fileName = "file.ts"
) {
	const compilerOptions = {};
	const fsMap = tsvfs
		.createDefaultMapFromNodeModules(compilerOptions)
		.set(fileName, textContent);
	const system = tsvfs.createSystem(fsMap);
	const host = tsvfs.createVirtualCompilerHost(system, compilerOptions, ts);
	const program = ts.createProgram({
		rootNames: [...fsMap.keys()],
		options: compilerOptions,
		host: host.compilerHost,
	});

	return {
		sourceFile: program.getSourceFile(fileName)!,
		typeChecker: program.getTypeChecker(),
	};
}
