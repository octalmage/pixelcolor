const {
  app,
  BrowserWindow,
  globalShortcut,
} = require('electron'); // eslint-disable-line import/no-extraneous-dependencies

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    alwaysOnTop: true,
    toolbar: false,
    width: 150,
    height: 150,
    resizable: false,
    maximizable: false,
  });

  mainWindow.loadFile('index.html');


  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  globalShortcut.register('CommandOrControl+Alt+P', () => {
    mainWindow.webContents.send('togglePause');
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
