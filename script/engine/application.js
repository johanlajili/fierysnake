ENGINE.Application = function (args) {
	var app = this;
	this.interactive = false;
	_.extend(this, args);


	this.stage = new PIXI.Stage(0x000000, this.interactive);
	this.background = new PIXI.DisplayObjectContainer();
	this.midground = new PIXI.DisplayObjectContainer();
	this.midforeground = new PIXI.DisplayObjectContainer();
	this.foreground = new PIXI.DisplayObjectContainer();
	this.stage.addChild(this.background);
	this.stage.addChild(this.midground);
	this.stage.addChild(this.midforeground);
	this.stage.addChild(this.foreground);

	this.renderer = new PIXI.CanvasRenderer(this.width, this.height);
	this.renderer.view.screencanvas = true;
	this.renderer.view.style.cssText = "idtkscale:ScaleAspectFit;"
	document.body.appendChild(this.renderer.view);


	eveline(this);

	this.loader = new ENGINE.Loader();
	this.assets = new ENGINE.Assets(this.loader);

	this.oncreate();
	this.loader.ready(function () {
		document.getElementById("loading").style.display = "none";
		app.onready();
	})
	this.resizeWithRatio();
}

ENGINE.Application.prototype = {
	dispatch: function (method) {
		if (this.scene && this.scene[arguments[0]]) {
			this.scene[arguments[0]].apply(this.scene, Array.prototype.slice.call(arguments, 1));
		}
	},
	selectScene: function (scene) {
		this.dispatch("onleave");
		this.scene = scene;
		var args = Array.prototype.slice.call(arguments, 1);
		args.unshift("onenter");
		this.dispatch.apply(this, args);
	},
	onstep: function (delta) {
		if (delta >= 50) {
			for (var i = 0; i < delta / 25; i++) {
				if (i <= 2) {
					this.dispatch("onstep", delta / 25);
				}
			}
		} else {
			this.dispatch("onstep", delta);
			this.dispatch("onrender", delta);
			this.renderer.render(this.stage)
		}
	},
	onkeydown: function (key) {
		this.dispatch("onkeydown", key);
	},
	onmousedown: function (e, d, s) {
		this.dispatch("onclick", e);
	},
	ontouchstart: function () {
		this.dispatch("onclick")
	},
	onresize: function () {
		//this.resizeWithRatio();
	},
	resizeWithRatio: function () {
		var windowWidth = window.innerWidth;
		var windowHeight = window.innerHeight;
		var scaleToFitX = windowWidth / this.width;
		var scaleToFitY = windowHeight / this.height;
		var currentScreenRatio = windowWidth / windowHeight;
		var optimalRatio = Math.min(scaleToFitX, scaleToFitY);
		this.renderer.view.style.width = this.width * optimalRatio + "px";
		this.renderer.view.style.height = this.height * optimalRatio + "px";
		this.renderer.view.style.marginLeft = -(this.width * optimalRatio / 2) + "px"
		this.renderer.view.style.marginTop = -(this.height * optimalRatio / 2) + "px"
	}

}