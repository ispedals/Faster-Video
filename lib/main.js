const cm = require("sdk/context-menu");
cm.Menu({
	label: "Video Speed",
	contentScriptFile: require("sdk/self").data.url("speeder.js"),
	items: [
		cm.Item({ label: "5X", data: "5X" }),
		cm.Item({ label: "3X", data: "3X" }),
		cm.Item({ label: "1X", data: "1X" }),
		cm.Item({ label: "0.5X", data: "0.5X" }),
		cm.Separator(),
		cm.Item({ label: "1.0+", data: "1" }),
		cm.Item({ label: "0.25+", data: "0.25" }),
		cm.Item({ label: "0.25-", data: "-0.25" }),
		cm.Item({ label: "1-", data: "-1.0" })
	],
	onMessage: function (args) {
		if(args.endsWith('X')) {
			this.label = "Video Speed: " + args;
		}
		else {
			this.label = "Video Speed";
		}
	}
});