// Imports and require()s
const path = require("path");
const fs = require("fs");
const os = require("os");
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const isDev = require("electron-is-dev");

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
			? "http://joe-suse:3000"
			: `file://${path.join(__dirname, "../build/index.html")}`
	);

	// Open the DevTools.
	if (isDev) {
		win.webContents.openDevTools({ mode: "detach" });
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
app.whenReady().then(createWindow);

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

ipcMain.handle("readJSON", async (event) => {
	const homeDir = os.homedir();
	const dir = `${homeDir}/withIt Files`;
	const bufferData = await fs.readFileSync(`${dir}/BandView - Spotify.json`);
	return bufferData.toString("utf8");
});

ipcMain.on("writeJSON", (event, data) => {
	const homeDir = os.homedir();
	const dir = `${homeDir}/withIt Files`;
	fs.writeFileSync(`${dir}/BandView - Spotify.json`, data);
	console.log("File written successfuly");
});

// Use this instead of console.log -
/* 
dialog.showMessageBox({
	type: "info",
	buttons: ["Okay"],
	message: `${bufferData}`,
});
*/
