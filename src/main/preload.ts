import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ipcRenderer", {
  invoke: (channel, args) => {
    const validChannels = ["request"];
    if (!validChannels.includes(channel)) return;
    return ipcRenderer.invoke(channel, args);
  },
  subscribe: (channel) => {
    return new Promise((resolve, reject) => {
      const validChannels = ["event"];
      if (!validChannels.includes(channel)) reject("Not a valid channel!");
      ipcRenderer.on(channel, (event, data) => {
        resolve(data);
      });
    });
  },
});
