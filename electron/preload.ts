const { contextBridge } = require('electron');

// Expose protected methods that allow the renderer process to use
// Node.js APIs without exposing the entire objects.
contextBridge.exposeInMainWorld('electron', {
  // Add any APIs you want to expose to the renderer process here
});