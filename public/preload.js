const { contextBridge, ipcRenderer, dialog } = require("electron");

contextBridge.exposeInMainWorld("electron", {
	readJSON: async () => {
		return await ipcRenderer.invoke("readJSON");
	},
	writeJSON: (data) => {
		ipcRenderer.send("writeJSON", data);
	},
});

// const response = ipcRenderer.on("JSONResponse", (responseData) => {
// 	console.log(response);
//});
