import * as tsvfs from "@typescript/vfs";
import * as ts from "typescript";

interface SourceFileAndTypeChecker {
	sourceFile: ts.SourceFile;
	typeChecker: ts.TypeChecker;
}

export function createNode<Node extends ts.Node>(
	nodeOrSourceText: Node | string,
): Node {
	if (typeof nodeOrSourceText !== "string") {
		return nodeOrSourceText;
	}

	return createNodeAndSourceFile<Node>(nodeOrSourceText).node;
}

// Test-only code, this unsafe assertion is fine.
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function createNodeAndSourceFile<Node extends ts.Node>(
	sourceText: string,
): { node: Node; sourceFile: ts.SourceFile } {
	const sourceFile = createSourceFile(sourceText);
	const statement = sourceFile.statements.at(-1)!;

	const node = (ts.isExpressionStatement(statement)
		? statement.expression
		: statement) as unknown as Node;

	return { node, sourceFile };
}

export function createSourceFile(sourceText: string): ts.SourceFile {
	return ts.createSourceFile(
		"file.tsx",
		sourceText,
		ts.ScriptTarget.ESNext,
		true,
	);
}

export function createSourceFileAndTypeChecker(
	sourceText: string,
	fileName = "file.tsx",
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
		compilerOptions,
	);

	const program = env.languageService.getProgram();
	if (program === undefined) {
		throw new Error("Failed to get program.");
	}

	const diagnostics = program.getSyntacticDiagnostics();

	if (diagnostics.length > 0) {
		throw new Error(
			ts.flattenDiagnosticMessageText(
				diagnostics[0].messageText,
				ts.sys.newLine,
			),
		);
	}

	return {
		sourceFile: program.getSourceFile(fileName)!,
		typeChecker: program.getTypeChecker(),
	};
}
