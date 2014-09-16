app.game = new ENGINE.Scene({
	onenter: function (selectedLevel, restartMusic) {
		this.balance = app.balance[selectedLevel];
		this.selectedLevel = selectedLevel;
		this.name = "game"
		this.started = false;
		this.scoreCount = 100;
		this.countingScore = false;
		ENGINE.Position.prototype.restart();
		this.snake = new ENGINE.Snake({
			speed: this.balance.speed
		});
		this.tunnelsPartition = new ENGINE.EnemyPartition({
			balance: this.balance
		});
		this.mainGUI = new ENGINE.Collection(this);
		this.snake.create();
		this.score = new ENGINE.Number({
			"number": 0
		});
		if (restartMusic) {
			this.playMusic();
		}
		this.music.setVolume(1);
		this.startGame();
	},
	playMusic: function () {
		this.music = app.audio.play("musicInGame", {
			loop: -1,
		});
	},
	onstep: function (delta) {
		if (this.countingScore) {
			this.countScore(delta);
		}
		if (this.miniScore) {
			this.miniScore.step(delta);
		}
		if (this.highscore) {
			this.highscore.step(delta);
		}
		this.score.step(delta);
		this.snake.step(delta);
		this.mainGUI.step(delta);
		this.tunnelsPartition.step(delta);
	},
	onkeydown: function (key) {
		this.snake.reverse();
	},
	onclick: function (e) {
		this.snake.reverse();
	},
	startGame: function () {
		if (this.started) return;
		this.tunnelsPartition.create();
		this.started = true;
	},
	launchGameOver: function () {
		var that = this;
		this.stop();
		var game = this;
		this.snake.mute = true;
		navigator.vibrate(500);
		this.music.setVolume(.2);
		app.audio.play("gameover");
		this.score.remove();

		var highscore = parseInt(app.save.get("highscore" + that.selectedLevel) || 0);
		var oldHighscore = highscore;
		if (this.score.number > 0) {
			app.social.submitScore(this.score.number, that.selectedLevel);
		}
		console.log("launch game over")
		if (this.score.number > highscore) {
			highscore = this.score.number;
			console.log("submit high score in game " + highscore);
			app.save.set("highscore" + that.selectedLevel, highscore);
		}

		this.mainGUI.add(ENGINE.Button, {
			animation: "assets/animations/playAnimation.json",
			x: 160,
			y: 90,
			skin: "gameover",
			onClick: function () {},
			onTap: function () {}
		}).create();

		var scorePanel = this.mainGUI.add(ENGINE.ScorePanel, {
			x: 160,
			y: 200,
			onClick: function () {},
			onComplete: function () {
				console.log("onComplete");
				that.roulement = app.audio.play("roulement");
				that.countingScore = true;
			}
		})
		scorePanel.create();
		this.miniScore = new ENGINE.Number({
			x: 255,
			y: 1000,
			xOffset: 90,
			yOffset: -20,
			size: 30,
			align: "right",
			follow: scorePanel,
			number: 0
		})
		this.highscore = new ENGINE.Number({
			x: 255,
			y: 1000,
			xOffset: 90,
			yOffset: 30,
			size: 30,
			align: "right",
			follow: scorePanel,
			number: oldHighscore
		})
	},
	countScore: function (delta) {
		var that = this;
		this.scoreCount -= delta;
		if (this.scoreCount <= 0) {
			this.scoreCount = 300 - this.miniScore.number * 10;
			if (this.miniScore.number < this.score.number) {
				this.miniScore.number++;
			} else {
				this.countingScore = false;
				app.audio.stop(that.roulement);
				if (this.miniScore.number >= 100) {
					this.displayMedal("black");
					app.audio.play("unbelievableClaps");
				} else if (this.miniScore.number >= 50) {
					this.displayMedal("white");
					app.audio.play("fantasticClaps");
				} else if (this.miniScore.number >= 30) {
					this.displayMedal("gold");
					app.audio.play("hardcoreClaps");
				} else if (this.miniScore.number >= 20) {
					this.displayMedal("silver");
					app.audio.play("crazyClaps");
				} else if (this.miniScore.number >= 10) {
					this.displayMedal("bronze");
					app.audio.play("superClaps");
				}
				this.displayButtons();
				setTimeout(function () {
					app.game.displayAd();
				}, 1000)
			}
		}
	},
	displayAd: function () {
		//app.ad.showFullscreenAdd();
	},
	displayMedal: function (skin) {
		this.mainGUI.add(ENGINE.Button, {
			skin: skin,
			animation: "assets/animations/medal.json",
			firstloop: true,
			x: 100,
			y: 200
		}).create();
	},
	displayButtons: function () {
		var that = this;
		this.mainGUI.add(ENGINE.Button, {
			animation: "assets/animations/playAnimation.json",
			x: 160,
			y: 390,
			skin: "play",
			onClick: function () {
				app.audio.play("button");
				that.restart();
			},
			onTap: function () {
				this.onClick();
			}
		}).create();
		this.mainGUI.add(ENGINE.Button, {
			animation: "assets/animations/playAnimation.json",
			x: 80,
			y: 320,
			skin: "menu",
			onClick: function () {
				app.audio.play("button");
				that.goBackToMenu();
			},
			onTap: function () {
				this.onClick();
			}
		}).create();
		this.mainGUI.add(ENGINE.Button, {
			animation: "assets/animations/playAnimation.json",
			x: 240,
			y: 320,
			skin: "highscore",
			onClick: function () {
				app.audio.play("button");
				app.social.showLeaderboard(that.selectedLevel);
			},
			onTap: function () {
				this.onClick();
			}
		}).create();
	},
	stop: function () {
		this.snake.stop();
		this.tunnelsPartition.stop();
	},
	disparition: function () {
		app.selectScene(app.game);
	},
	onleave: function () {
		this.mainGUI.call("remove");
		this.miniScore.remove();
		this.highscore.remove();
		this.tunnelsPartition.remove();
		this.snake.remove();
	},
	restart: function () {
		app.selectScene(app.game, this.selectedLevel);
	},
	goBackToMenu: function () {
		this.music.stop();
		app.selectScene(app.menu);
	}

});