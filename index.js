const cm = require("sdk/context-menu");
const preferences = require("sdk/simple-prefs");
const prefs = preferences.prefs;

const parseNumbers = require('./numberParser.js').parseNumbers;

const defaultSpeeds = "0.5, 1, 3, 5";
const defaultModifiers = "0.25, 1";

var menu = null;

function createMenu(){
    if (menu){
        menu.destroy();
    }

    let speeds = prefs.speeds;
    speeds = parseNumbers(speeds, defaultSpeeds);
    speeds = speeds.sort((a,b) => b-a);
    speeds = speeds.map(x => cm.Item({ label: x.toString() + "X", data: x.toString() + "X" }));

    let modifiers = prefs.modifiers;
    modifiers =  parseNumbers(modifiers, defaultModifiers);
    
    modifiers = modifiers.sort((a,b) => b-a);
    let positiveModifiers = modifiers.map(x => cm.Item({ label: x.toString() + "+", data: x.toString() }));

    modifiers = modifiers.sort((a,b) => a-b);
    let negativeModifiers = modifiers.map(x => cm.Item({ label: x.toString() + "-", data: '-' + x.toString() }));

    let items = [].concat(speeds, cm.Separator(), positiveModifiers, negativeModifiers);

    menu = cm.Menu({
        label: "Playback Speed",
        contentScriptFile: "./manipulator.js",
        items: items,
        onMessage: function (args) {
            if(args.endsWith('X')) {
              this.label = "Playback Rate: " + args;
            }
            else {
              this.label = "Playback Rate";
            }
        }
    });
}

createMenu();
preferences.on("", createMenu);