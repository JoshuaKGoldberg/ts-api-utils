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
	const compilerOptions: ts.CompilerOptions = {
		lib: ["ES2018"],
		target: ts.ScriptTarget.ES2018,
	};

	const fsMap = tsvfs.createDefaultMapFromNodeModules(compilerOptions, ts);
	fsMap.set(fileName, sourceText);

	const system = tsvfs.createSystem(fsMap);
	const env = tsvfs.createVirtualTypeScriptEnvironment(
		system,
		[fileName],
		ts,
		compilerOptions
	);

	const program = env.languageService.getProgram();
	if (program === undefined) {
		throw new Error("Failed to get program.");
	}

	return {
		sourceFile: program.getSourceFile(fileName)!,
		typeChecker: program.getTypeChecker(),
	};
}
