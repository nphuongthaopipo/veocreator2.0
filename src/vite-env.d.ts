/// <reference types="vite/client" />

// FIX: Add type definition for window.electronAPI to make it available globally in TypeScript.
// This is necessary because the preload script exposes this API to the renderer process.
declare global {
  interface Window {
    electronAPI: {
      getApiKey: () => Promise<string>;
    };
  }
}

// FIX: Convert this file to a module by adding 'export {}'. This allows global augmentation and resolves the "'electronAPI' does not exist on type 'Window'" errors.
export {};
