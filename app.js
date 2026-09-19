const { app, BrowserWindow, globalShortcut, ipcMain, Menu } = require("electron");
const robot = require("robotjs");
let win;

function createWindow() {
    win = new BrowserWindow({
        alwaysOnTop: true,
        width: 160,
        height: 140,
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

let maxW = 0, maxH = 0;

function initBounds() {
    if (maxW === 0) {
        const { screen } = require("electron");
        const workArea = screen.getPrimaryDisplay().workAreaSize;
        maxW = workArea.width;
        maxH = workArea.height;
    }
}

ipcMain.on("getPixelColor", (event) => {
    initBounds();
    const pos = robot.getMousePos();
    if (pos.x >= 0 && pos.x < maxW && pos.y >= 0 && pos.y < maxH) {
        event.returnValue = [pos.x, pos.y, robot.getPixelColor(pos.x, pos.y)];
    } else {
        event.returnValue = [pos.x, pos.y, null];
    }
});
