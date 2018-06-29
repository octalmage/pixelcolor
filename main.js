const {
    app,
    BrowserWindow,
    globalShortcut,
    ipcMain,
} = require('electron');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
      'alwaysOnTop': true,
      'toolbar': false,
      'width': 150,
      'height': 150,
      'resizable': false,
      'maximizable': false,
    });

    mainWindow.loadFile('index.html');


    mainWindow.on('closed', function() {
        mainWindow = null;
    });

    globalShortcut.register('CommandOrControl+Alt+P', () => {
      mainWindow.webContents.send('togglePause');
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow();
    }
});
