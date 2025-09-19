import { app, BrowserWindow, screen } from 'electron'; // Thêm 'screen' vào đây
import path from 'path';
import url from 'url';

// Định nghĩa lại __dirname cho cú pháp ES Module
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  // Lấy thông tin về màn hình chính
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  // Tạo cửa sổ với kích thước của màn hình
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    },
  });

  const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

  if (VITE_DEV_SERVER_URL) {
    // Tải từ server phát triển
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    // Tải tệp đã build
    mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});