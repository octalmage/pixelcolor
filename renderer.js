const { ipcRenderer, clipboard } = require("electron");

let timer = null;
let hex = "";

document.getElementById("drag").style.WebkitAppRegion = "drag";

start();

document.getElementById("color").onclick = function() {
    clipboard.writeText(hex);
};

ipcRenderer.on("toggle-pause", function() {
    if (timer === null) {
        start();
    } else {
        clearInterval(timer);
        timer = null;
    }
});

function start() {
    timer = setInterval(function() {
        try {
            let args = ipcRenderer.sendSync("getPixelColor");
            if (args[2]) {
                hex = "#" + args[2];
                document.getElementById("color").textContent = hex;
                document.body.style.backgroundColor = hex;
            }
        } catch (e) {
            console.error(e.message);
        }
    }, 200);
}
