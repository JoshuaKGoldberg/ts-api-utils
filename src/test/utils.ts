import tsvfs from "@typescript/vfs";
import ts from "typescript";

export function createNode<Node extends ts.Node>(
	nodeOrSourceText: Node | string
): Node {
	if (typeof nodeOrSourceText !== "string") {
		return nodeOrSourceText;
	}

	const sourceFile = ts.createSourceFile(
		"file.ts",
		nodeOrSourceText,
		ts.ScriptTarget.ESNext
	);
	const statement = sourceFile.statements.at(-1)!;

	return (ts.isExpressionStatement(statement)
		? statement.expression
		: ts.isVariableStatement(statement)
		? statement.declarationList.declarations[0]
		: statement) as unknown as Node;
}

interface SourceFileAndTypeChecker {
	sourceFile: ts.SourceFile;
	typeChecker: ts.TypeChecker;
}

export function createSourceFileAndTypeChecker(
	sourceText: string,
	fileName = "file.ts"
): SourceFileAndTypeChecker {
	const compilerOptions = {};
	const fsMap = tsvfs
		.createDefaultMapFromNodeModules(compilerOptions)
		.set(fileName, sourceText);
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
