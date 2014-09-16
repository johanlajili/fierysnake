ENGINE.Tunnel = Compose(ENGINE.PrimitiveEntity, {
	x: 160,
	y: 200,
	startOffset: 0,
	createOffset: app.height,
	speed: app.speed,
	direction: 0,
	shakeCount: 400,
	pointGiven: false,
	onScreenDisappearCalled: false,
	graphicsDatas: function () {
		var shape = ENGINE.tunnelAlgorithm.prototype.pointMapFromCurve(this.curve);
		this.leftPart = new PIXI.Graphics();
		this.leftPart.beginFill(0x00FF00);
		this.leftPart.moveTo(app.game.snake.borderWidth, this.curve.height);
		for (var i = 0; i < shape.leftPart.length; i++) {
			this.leftPart.lineTo(shape.leftPart[i].x, shape.leftPart[i].y);
		}
		this.leftPart.endFill();

		this.rightPart = new PIXI.Graphics();
		this.rightPart.beginFill(0x00FF00);
		this.rightPart.moveTo(app.width - app.game.snake.borderWidth, this.curve.height);
		for (var i = 0; i < shape.rightPart.length; i++) {
			this.rightPart.lineTo(shape.rightPart[i].x, shape.rightPart[i].y);
		}
		this.rightPart.endFill();


		this.borderGraphics = new PIXI.Graphics();
		this.borderGraphics.beginFill(0x111111);
		this.borderGraphics.moveTo(app.game.snake.borderWidth - 5, this.curve.height + 4);
		this.borderGraphics.lineTo(shape.leftBorderStart.x, shape.leftBorderStart.y);
		for (var i = 0; i < shape.leftPart.length - 1; i++) {
			this.borderGraphics.lineTo(shape.leftPart[i].x, shape.leftPart[i].y);
		}
		this.borderGraphics.lineTo(shape.leftBorderEnd.x, shape.leftBorderEnd.y);
		this.borderGraphics.lineTo(shape.leftPart[shape.leftPart.length - 1].x - 5, shape.leftPart[shape.leftPart.length - 1].y - 4);
		this.borderGraphics.endFill();



		this.borderGraphics2 = new PIXI.Graphics();
		this.borderGraphics2.beginFill(0x111111);
		this.borderGraphics2.moveTo(app.width - app.game.snake.borderWidth + 5, this.curve.height + 4);
		this.borderGraphics2.lineTo(shape.rightBorderStart.x, shape.rightBorderStart.y);
		for (var i = 0; i < shape.rightPart.length - 1; i++) {
			this.borderGraphics2.lineTo(shape.rightPart[i].x, shape.rightPart[i].y);
		}
		this.borderGraphics2.lineTo(shape.rightBorderEnd.x, shape.rightBorderEnd.y);
		this.borderGraphics2.lineTo(shape.rightPart[shape.rightPart.length - 1].x + 5, shape.rightPart[shape.rightPart.length - 1].y - 4);
		this.borderGraphics2.endFill();



		this.y = -this.curve.height;
		return [this.leftPart, this.rightPart, this.borderGraphics, this.borderGraphics2];
	},


	create: Compose.after(function () {
		this.speed = this.balance.speed;
		this.texture = new ENGINE.Collection(this);
		this.borderGraphics.position.x = 5;
		this.borderGraphics2.position.x = -5;
		var texture = "assets/images/texture" + Math.ceil(Math.random() * 29) + ".png";
		this.texture.add(ENGINE.TunnelTexture, {
			y: this.y,
			width: app.width,
			height: this.curve.height,
			tile: texture
		}).create(this.leftPart);
		this.texture.add(ENGINE.TunnelTexture, {
			y: this.y,
			width: app.width,
			height: this.curve.height,
			tile: texture
		}).create(this.rightPart);
	}),
	stop: function () {
		this.stopped = true;

	},
	shake: function () {
		var x = Math.floor(this.x + (Math.random() - 0.5) * 10);
		var y = Math.floor(this.y + (Math.random() - 0.5) * 10);
		this.leftPart.position.y = y;
		this.rightPart.position.y = y;
		this.borderGraphics.position.y = y;
		this.borderGraphics2.position.y = y;
		app.game.snake.bodyParts.call("moveFake", 0, y);
	},
	step: function (delta) {
		this.texture.step(delta);
		if (this.shaking && this.shakeCount >= 0) {
			this.shakeCount -= delta;
			this.shake();
		}
		if (this.stopped) {
			return;
		}
		var that = this;
		if (this.y + this.curve.height > app.game.snake.y - app.game.snake.headWidth / 2) {
			if (this.y < app.game.snake.y - app.game.snake.headWidth) {
				this.performCollisionTest();
			} else {
				if (!this.pointGiven) {
					app.game.score.number++;
					switch (app.game.score.number) {
					case 10:
						app.audio.play("super");
						break;
					case 20:
						app.audio.play("crazy");
						break;
					case 30:
						app.audio.play("hardcore");
						break;
					case 50:
						app.audio.play("fantastic");
						break;
					case 100:
						app.audio.play("unbelievable");
						break;
					default:
						app.audio.play("point");
						break;
					}
					this.pointGiven = true;
				}
			}
		}
		if (this.y >= 100 && !that.onScreenDisappearCalled) {
			that.onScreenDisappear(this.y);
			that.onScreenDisappearCalled = true;
		}
		this.move(delta);
		this.leftPart.position.y = this.y;
		this.rightPart.position.y = this.y;
		this.borderGraphics.position.y = this.y;
		this.borderGraphics2.position.y = this.y;
		this.texture.call("translate", this.y);
		if (this.y >= app.height) {
			this.texture.call("remove")
			this.remove();
		}

		//this.texture[0].sprite.position.y = this.y;
		//this.texture.step(delta)
	},
	move: function (delta) {
		this.y += this.speed * delta;

	},
	onScreenDisappear: function () {

	},
	getCurve: function () {
		return ENGINE.tunnelAlgorithm.prototype.getCurve({
			opening: this.opening,
			destination: this.destination,
			balance: this.balance
		})
	},
	performCollisionTest: function () {
		var that = this;
		var snakeCursor = this.y + this.curve.height - app.game.snake.y + app.game.snake.headWidth / 2;
		this.curve.forEach(function (obj, i) {
			if (obj.y <= snakeCursor && that.curve[i + 1] && that.curve[i + 1].y > snakeCursor) {
				var firstHole = obj;
				var secondHole = that.curve[i + 1];
				var distanceBetweenHole = {
					x: secondHole.x - firstHole.x,
					y: secondHole.y - firstHole.y
				};
				var distanceSoFar = snakeCursor - firstHole.y;
				var xCursor = distanceSoFar * distanceBetweenHole.x / distanceBetweenHole.y;
				if (app.game.snake.x - app.game.snake.headWidth / 2 < obj.x + xCursor || app.game.snake.x + app.game.snake.headWidth / 2 > obj.x + xCursor + obj.holeWidth) {
					app.game.launchGameOver();
					that.shaking = true;
				}
			}
		})
	},
	superRemove: function () {
		this.texture.call("remove");
		this.remove();
	}

});