const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
	readBVSpotifySubs: async () => {
		return await ipcRenderer.invoke("readBVSpotifySubs");
	},
	writeBVSpotifySubs: (data) => {
		ipcRenderer.send("writeBVSpotifySubs", data);
	},
	writeBVYouTubeSubs: (data) => {
		ipcRenderer.send("writeBVYouTubeSubs", data);
	},
	readBVYouTubeSubs: async () => {
		return await ipcRenderer.invoke("readBVYouTubeSubs");
	},
	getInstagramToken: async (data) => {
		return await ipcRenderer.invoke("getInstagramToken", data);
	},
});
