var robot = require("robotjs");
var gui = require("nw.gui");

var win = gui.Window.get();
var clipboard = gui.Clipboard.get();

var timer = null;
var hex;

//Pause the app so you can copy the color.
var pauseHotkey = {
	key: "Ctrl+Alt+P",
	active: function()
	{
		if (timer === null)
		{
			start();
		}
		else
		{
			clearTimeout(timer);
			timer = null;
		}
	},
	failed: function(msg)
	{
		console.log(msg);
	}
};

// var shortcut = new gui.Shortcut(pauseHotkey);

// gui.App.registerGlobalHotKey(shortcut);

$(document).on("ready", function()
{
    start();

    $("#color").on("click", function()
    {
        clipboard.set(hex, "text");
    });

});

function start()
{
	timer = setInterval(function()
	{
		var mouse = robot.getMousePos();
		hex = robot.getPixelColor(mouse.x, mouse.y);
		$("#color").text(hex);
		$("body").css("background-color", "#" + hex);
	}, 200);
}
