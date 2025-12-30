import os from "node:os";
import path from "node:path";
import process from "node:process";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		clearMocks: true,
		coverage: {
			all: true,
			exclude: ["lib"],
			include: ["src"],
			reporter: ["html", "lcov"],
		},
		exclude: ["lib", "node_modules"],
		execArgv: [
			"--localstorage-file",
			path.resolve(os.tmpdir(), `vitest-${String(process.pid)}.localstorage`),
		],
		setupFiles: ["console-fail-test/setup"],
	},
});
