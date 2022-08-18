import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ipcRenderer", {
  invoke: (channel, args) => {
    let validChannels = ["request"];
    if (validChannels.includes(channel)) {
      return ipcRenderer.invoke(channel, args);
    }
  },
});
