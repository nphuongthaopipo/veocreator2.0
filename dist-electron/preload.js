const { contextBridge } = require("electron");
contextBridge.exposeInMainWorld("electron", {
  // Add any APIs you want to expose to the renderer process here
});
