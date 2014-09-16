app.menu = new ENGINE.Scene({
	onenter: function () {
		var menu = this;
		this.name = "menu";
		this.isLeaving = false;
		this.backgroundGUI = new ENGINE.Collection(this);
		this.mainGUI = new ENGINE.Collection(this);
		this.selectedLevel = "";
		this.createBackground();
		this.createButtons();
		ENGINE.Position.prototype.restart();
		this.snake = new ENGINE.Snake({
			mute: true,
			y: 320
		});
		this.music = app.audio.play("musicMenu", {
			loop: -1,
		});



		//We call the create function of all sprites / movieclip
		this.backgroundGUI.call("create");
		this.snake.create();
		this.mainGUI.call("create");

	},
	createBackground: function () {
		var menu = this;
		this.backgroundGUI.add(ENGINE.Background);
		this.mainGUI.add(ENGINE.Title, {
			x: 165,
			y: 70,
			id: "title"
		});
	},
	onclick: function (e) {
		this.snake.reverse();
	},
	createButtons: function () {
		var menu = this;
		var bought = app.save.get("insaneBought") == "true";
		this.mainGUI.add(ENGINE.Button, {
			animation: "assets/animations/playAnimation.json",
			x: 90,
			y: 160,
			skin: "medium",
			onClick: function () {
				if (this.isRemoving) return;
				menu.selectedLevel = 'medium';
				app.audio.play("button");
				this.spine.state.setAnimationByName("Tap", false);
				menu.disparition();
				this.removeAfterAnim();
			},
			onTap: function () {
				this.onClick();
			}
		});
		this.mainGUI.add(ENGINE.Button, {
			animation: "assets/animations/playAnimation.json",
			x: 230,
			y: 160,
			skin: "hard",
			onClick: function () {
				if (this.isRemoving) return;
				menu.selectedLevel = 'hard';
				app.audio.play("button");
				this.spine.state.setAnimationByName("Tap", false);
				menu.disparition();
				this.removeAfterAnim();
			},
			onTap: function () {
				this.onClick();
			}
		});
		this.mainGUI.add(ENGINE.Button, {
			animation: "assets/animations/playAnimation.json",
			x: 90,
			y: 240,
			skin: bought ? "insanebought" : "insane",
			bought: bought,
			onClick: function () {
				var insaneButton = this;
				if (this.isRemoving) return;
				app.audio.play("button");
				this.spine.state.setAnimationByName("Tap", false);
				if (this.bought) {
					menu.selectedLevel = 'insane';
					menu.disparition();
					this.removeAfterAnim();
				} else {
					app.inAppPurchase.buy("insaneAndNoAd");
					app.inAppPurchase.onItemIsPurchased("insaneAndNoAd", function done(id) {
						app.save.set("insaneBought", true);
						menu.mainGUI.call("onBought");
						app.ad.hideBanner();
					}, function fail() {
						insaneButton.spine.state.setAnimationByName("Apparition", false);
					});
				}
			},
			onTap: function () {
				this.onClick();
			},
			onBought: function () {
				console.log("changeSkin");
				bought = true;
				this.bought = true;
				this.changeSkin("insanebought");
				this.spine.state.setAnimationByName("Apparition", false);
			}
		});
		this.mainGUI.add(ENGINE.Button, {
			animation: "assets/animations/playAnimation.json",
			x: 230,
			y: 240,
			skin: "highscore",
			onClick: function () {
				app.audio.play("button");
				app.social.showLeaderboards();
			},
			onTap: function () {
				this.onClick();
			}
		});

	},

	onstep: function (delta) {
		this.backgroundGUI.step(delta);
		this.mainGUI.step(delta);
		this.snake.step(delta)
		if (this.isLeaving) {
			app.selectScene(app.game, this.selectedLevel, true);
		}
	},
	onkeydown: function (key) {},
	onleave: function () {
		// When we leave this scene, we delete the mainGUI but not the background;
		this.music.stop();
		this.mainGUI.call("remove")
		this.snake.remove();
	},
	disparition: function () {

		this.mainGUI.call("disparition");
		this.isLeaving = true;
		//setTimeout(function(){app.selectScene(app.game)}, 3000);
	}
});