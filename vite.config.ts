import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import electron from "vite-plugin-electron";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		tailwindcss(),
		reactRouter(),
		tsconfigPaths(),
		electron([
			{
				entry: "src/backend/index.ts",
				onstart: ({ startup }) => {
					startup();
				},
			},
			{
				entry: "src/backend/index.ts",
				onstart: ({ reload }) => {
					reload();
				},
			},
		]),
	],
});
