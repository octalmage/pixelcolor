const robot = require('robotjs');
const { clipboard, ipcRenderer } = require('electron');

let timer = null;
let hex;

const colorElement = document.querySelector('#color');

ipcRenderer.on('togglePause', () => {
	if (timer === null)
	{
		start();
	}
	else
	{
		clearTimeout(timer);
		timer = null;
	}
})

// var shortcut = new gui.Shortcut(pauseHotkey);
//
// gui.App.registerGlobalHotKey(shortcut);

//Needed for copy/paste on Mac.
// if (process.platform === "darwin")
// {
// 	var nativeMenuBar = new gui.Menu(
// 	{
// 		type: "menubar"
// 	});
// 	nativeMenuBar.createMacBuiltin("PixelColor");
// 	win.menu = nativeMenuBar;
// }


colorElement.addEventListener('click', function() {
	clipboard.writeText(hex);
});

function start()
{
	timer = setInterval(function()
	{
		var mouse = robot.getMousePos();
		hex = robot.getPixelColor(mouse.x, mouse.y);
		colorElement.textContent = hex.toUpperCase();
		document.querySelector('body').style.backgroundColor = '#' + hex;
	}, 200);
}

start();
