import { defineConfig } from "tsdown";

export default defineConfig({
	format: ["cjs", "esm"],
	outDir: "lib",
	treeshake: true,
});
