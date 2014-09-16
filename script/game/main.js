var app = {};
app = new ENGINE.Application({
	interactive: true,
	width: 320,
	height: window.innerHeight > window.innerWidth ? window.innerHeight * 320 / window.innerWidth : 480,
	innerWidth: 302,
	speed: 0.17,

	oncreate: function () {
		var that = this;
		this.assets.addAnimation("playAnimation.json");
		this.assets.addAnimation("score.json");
		this.assets.addAnimation("medal.json");
		this.assets.addImage("game.json");
		for (var i = 1; i < 30; i++) {
			this.assets.addImage("texture" + i + ".png");
		}
		var sounds = [
			{
				name: "reverse",
				uri: "assets/audio/CHANGEDIRECTION02.wav"
			},
			{
				name: "gameover",
				uri: "assets/audio/WALLBITCH02.wav"
			},
			{
				name: "point",
				uri: "assets/audio/point.wav"
			},
			{
				name: "musicInGame",
				uri: "assets/audio/FIERYSNAKEMUSICINGAME02.mp3"
			},
			{
				name: "musicMenu",
				uri: "assets/audio/FIERYSNAKEMUSICMENU.mp3"
			},
			{
				name: "crazy",
				uri: "assets/audio/COMMENTIONCRAZY.wav"
			},
			{
				name: "super",
				uri: "assets/audio/COMMENTIONSUPER.wav"
			},
			{
				name: "hardcore",
				uri: "assets/audio/COMMENTIONHARDCORE.wav"
			},
			{
				name: "fantastic",
				uri: "assets/audio/COM-MENTION-FANTASTIC.wav"
			},
			{
				name: "unbelievable",
				uri: "assets/audio/COM-MENTION-UNBELIEVABLE.wav"
			},
			{
				name: "crazyClaps",
				uri: "assets/audio/COM-MENTION-CRAZY_CLAPS.wav"
			},
			{
				name: "superClaps",
				uri: "assets/audio/COM-MENTION-SUPER_CLAPS.wav"
			},
			{
				name: "hardcoreClaps",
				uri: "assets/audio/COM-MENTION-HARDCORE_CLAPS.wav"
			},
			{
				name: "fantasticClaps",
				uri: "assets/audio/COM-MENTION-FANTASTIC_CLAPS.wav"
			},
			{
				name: "unbelievableClaps",
				uri: "assets/audio/COM-MENTION-UNBELIEVABLE_CLAPS.wav"
			},
			{
				name: "go",
				uri: "assets/audio/COMGO.wav"
			},
			{
				name: "ready",
				uri: "assets/audio/COMREADY.wav"
			},
			{
				name: "roulement",
				uri: "assets/audio/SD_ROULEMENT_SCORE.wav"
			},
			{
				name: "button",
				uri: "assets/audio/BUTTONPRESS02.wav"
			}
            ];

		this.save = new ENGINE.Save();
		this.ad = new ENGINE.Ad(this.save.get("insaneBought"));
		//this.social = new ENGINE.Social();
		this.inAppPurchase = new ENGINE.InAppPurchase();
		this.audio = new ENGINE.Audio({
			soundsUri: sounds,
			callback: function () {
				that.loader.load();
			}
		});
	},
	onready: function () {
		console.log("onReady")
		this.selectScene(this.menu);
	}
})