const robot = require('robotjs');
const { clipboard, ipcRenderer } = require('electron'); // eslint-disable-line import/no-extraneous-dependencies

let timer = null;
let hex;

const colorElement = document.querySelector('#color');

function start() {
  timer = setInterval(() => {
    const mouse = robot.getMousePos();
    hex = robot.getPixelColor(mouse.x, mouse.y).toUpperCase();
    colorElement.textContent = hex;
    document.querySelector('body').style.backgroundColor = `#${hex}`;
  }, 200);
}

ipcRenderer.on('togglePause', () => {
  if (timer === null) {
    start();
  } else {
    clearTimeout(timer);
    timer = null;
  }
});

colorElement.addEventListener('click', () => {
  clipboard.writeText(hex);
});

start();
