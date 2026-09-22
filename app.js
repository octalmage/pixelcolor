const { app, BrowserWindow, globalShortcut, ipcMain, Menu } = require("electron");
const robot = require("robotjs");
let win;

function createWindow() {
    win = new BrowserWindow({
        alwaysOnTop: true,
        width: 160,
        height: 140,
        minWidth: 160,
        minHeight: 140,
        resizable: true,
        useContentSize: true,
        title: "PixelColor",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    if (process.platform === "darwin") {
        const template = [
            { label: app.name, submenu: [{ role: "about" }, { type: "separator" }, { role: "quit" }] },
            { role: "editMenu" },
            { role: "windowMenu" }
        ];
        Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    } else {
        Menu.setApplicationMenu(null);
    }

    win.loadFile("index.html");
    win.show();
    win.on("closed", () => { win = null; });

    globalShortcut.register("CmdOrCtrl+Alt+P", () => {
        if (win) win.webContents.send("toggle-pause");
    });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("will-quit", () => globalShortcut.unregisterAll());

ipcMain.on("getPixelColor", (event) => {
    const pos = robot.getMousePos();
    try {
        const color = robot.screen.capture(pos.x, pos.y, 1, 1).colorAt(0, 0);
        event.returnValue = [pos.x, pos.y, color];
    } catch (error) {
        event.returnValue = [pos.x, pos.y, null];
    }
});
