const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  // ⚠️ attention à bien pointer vers le bon fichier
  win.loadFile(path.join(__dirname, 'dist', 'index.html'));

  win.webContents.openDevTools(); // pour voir les erreurs si l’écran est blanc
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
