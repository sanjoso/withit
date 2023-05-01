const { contextBridge, ipcRenderer, dialog } = require("electron");

contextBridge.exposeInMainWorld("electron", {
	readBVSpotifySubs: async () => {
		return await ipcRenderer.invoke("readBVSpotifySubs");
	},
	writeBVSpotifySubs: (data) => {
		ipcRenderer.send("writeBVSpotifySubs", data);
	},
	authenticateInstagram: () => {
		ipcRenderer.send("get-instagram-auth-session");
	},
	writeBVYouTubeSubs: (data) => {
		ipcRenderer.send("writeBVYouTubeSubs", data);
	},
	readBVYouTubeSubs: async () => {
		return await ipcRenderer.invoke("readBVYouTubeSubs");
	},
});
