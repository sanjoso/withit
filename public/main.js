// Imports and require()s
const path = require("path");
const fs = require("fs");
const os = require("os");
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const isDev = require("electron-is-dev");
const fetch = require("node-fetch");

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
			? "https://localhost:3000/"
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

//BandView Instagram Functions
ipcMain.handle("getInstagramToken", (event, ipcData) => {
	const clientId = "1355978245262681";
	const redirectUri = "https://localhost:3000/";
	const scopes = "user_profile,user_media";
	const clientSecret = "cf28e0c9f49deb958cf22a00020da6b9";
	const responseType = "code";
	const codeEndpoint = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scopes}`;
	const accessTokenEndpoint = "https://api.instagram.com/oauth/access_token";

	const authWindow = new BrowserWindow({
		width: 800,
		height: 600,
	});

	authWindow.loadURL(codeEndpoint);

	return new Promise((resolve, reject) => {
		authWindow.webContents.on("will-redirect", (event, newUrl) => {
			const url = new URL(newUrl);

			dialog.showMessageBox({
				message: `${url}`,
				buttons: ["okay"],
			});
			resolve(url);
		});
	});

	// const formData = new URLSearchParams();
	// formData.append("client_id", clientId);
	// formData.append("client_secret", clientSecret);
	// formData.append("grant_type", "authorization_code");
	// formData.append("redirect_uri", redirectUri);
	// formData.append("code", code);

	// const response = await fetch(accessTokenEndpoint, {
	// 	method: "POST",
	// 	body: formData,
	// });

	// const data = await response.json();
	// window.localStorage.setItem("instagramToken", data.access_token);
	// dialog.showMessageBox({
	// 	title: "Dialog Box",
	// 	message: "Hello, Electron!",
	// 	buttons: ["OK"],
	// });

	// return data.access_token;
});
