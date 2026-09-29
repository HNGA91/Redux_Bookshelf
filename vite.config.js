import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	build: {
		outDir: "dist",
	},
	server: {
		port: 8080,
	},
	css: {
		preprocessorOptions: {
			scss: {
				silenceDeprecations: ["import", "mixed-decls", "color-functions", "global-builtin"],
			},
		},
	},
});
