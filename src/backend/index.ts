import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BrowserWindow, app } from "electron";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_ROOT = process.env.APP_ROOT || __dirname;

export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;
export const MAIN_DIST = path.join(APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(APP_ROOT, "dist");

let window: BrowserWindow | null;

function createWindow() {
	window = new BrowserWindow({
		title: "Main window",
	});

	if (process.env.VITE_DEV_SERVER_URL) {
		window.loadURL(process.env.VITE_DEV_SERVER_URL);
	} else {
		window.loadFile(path.join(RENDERER_DIST, "index.html"));
	}
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
		window = null;
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
