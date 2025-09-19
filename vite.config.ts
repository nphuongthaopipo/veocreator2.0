import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron([
      {
        // Tệp chính của Electron
        entry: 'electron/main.ts',
      },
      {
        // Tệp preload script
        entry: 'electron/preload.ts',
        onstart(options) {
          // Lệnh này sẽ đợi server Vite sẵn sàng trước khi build preload script
          options.reload();
        },
      },
    ]),
    renderer(),
  ],
});