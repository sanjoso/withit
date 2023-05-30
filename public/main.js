// Imports and require()s
const path = require("path");
const fs = require("fs");
const os = require("os");
const { app, BrowserWindow, ipcMain, dialog, session } = require("electron");
const isDev = require("electron-is-dev");

//Chromium extension paths
const reduxDevToolsPath = path.join(
	os.homedir(),
	".config/chromium/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/3.0.19_0"
);

//Disables the menu bar
const { Menu } = require("electron");
Menu.setApplicationMenu(null);

//The hot reloader module
require("electron-reloader")(module);

function createWindow() {
	// Create the browser window.
	const win = new BrowserWindow({
		width: 1450,
		height: 816,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			nodeIntegration: true,
			enableRemoteModule: true,
			contextIsolation: true,
		},
	});

	//load the index.html from a url
	win.loadURL(
		isDev
			? "https://joe-suse:3000/"
			: `file://${path.join(__dirname, "../build/index.html")}`
	);

	// Open the DevTools.
	if (isDev) {
		win.webContents.openDevTools({ mode: "right" });
	}

	//check for the folder of JSON files
	const homeDir = os.homedir();
	if (!fs.existsSync(`${homeDir}/withIt Files`)) {
		fs.mkdir(`${homeDir}/withIt Files`, (err) => {
			console.log(err);
		});
	}
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app
	.whenReady()
	.then(createWindow)
	.then(async () => {
		await session.defaultSession.loadExtension(reduxDevToolsPath);
	});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.

	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

app.on(
	"certificate-error",
	(event, webContents, url, error, certificate, callback) => {
		event.preventDefault();
		callback(true);
	}
);

app.commandLine.appendSwitch("ignore-certification-errors");
app.commandLine.appendSwitch("allow-insecure-localhost", "true");

// Functions to read and write subscriptions
const homeDir = os.homedir();
const dir = `${homeDir}/withIt Files`;

//BandView Spotify functions
ipcMain.handle("readBVSpotifySubs", async (event) => {
	if (fs.existsSync(`${dir}/BVSpotifySubs.json`)) {
		const bufferData = fs.readFileSync(`${dir}/BVSpotifySubs.json`);
		return bufferData.toString("utf8");
	} else {
		fs.writeFileSync(`${dir}/BVSpotifySubs.json`, "[]");
		return [];
	}
});
ipcMain.on("writeBVSpotifySubs", (event, data) => {
	fs.writeFileSync(`${dir}/BVSpotifySubs.json`, data);
	console.log("Spotify subs written successfuly");
});

//BandView Youtube functions
ipcMain.handle("readBVYouTubeSubs", async (event) => {
	if (fs.existsSync(`${dir}/BVYouTubeSubs.json`)) {
		const bufferData = fs.readFileSync(`${dir}/BVYouTubeSubs.json`);
		return bufferData.toString("utf8");
	} else {
		fs.writeFileSync(`${dir}/BVYouTubeSubs.json`, "[]");
		return [];
	}
});
ipcMain.on("writeBVYouTubeSubs", (event, data) => {
	fs.writeFileSync(`${dir}/BVYouTubeSubs.json`, data);
	console.log("YouTube subs written successfuly");
});
