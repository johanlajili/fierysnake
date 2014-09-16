ENGINE.Snake = function (args) {
	this.x = 150,
	this.y = 280;
	this.destinationY = 280;
	this.headVisualWidth = 30;
	this.headVisualHeight = 40;
	this.headWidth = 15;
	this.bodyWidth = 30;
	this.direction = 1;
	this.speed = args.speed || app.speed;
	this.borderWidth = 10;
	this.maxspeed = 0.4;
	this.vspeed = 10
	this.offsetBetweenBodyParts = 10;
	this.offsetBetweenHeadAndBody = 10;
	this.size = 20;
	this.arrayTreshold = 80;
	this.propagationSpeed = this.offsetBetweenBodyParts / this.speed;
	this.bodyParts = new ENGINE.Collection(this);
	this.oldPositions = [];
	_.extend(this, args)
}

ENGINE.Snake.prototype = {
	create: function () {
		for (var i = this.size; i >= 1; i--) {
			this.bodyParts.add(ENGINE.SnakeBody, {
				x: 500,
				y: this.y,
				decalage: this.offsetBetweenHeadAndBody + (i * this.offsetBetweenBodyParts),
				delay: i * 1000,
				color2: "white",
				opacity2: 0.1,
				width: this.bodyWidth,
				height: this.bodyWidth,
				id: i
			}).create();
		}
		this.head = this.bodyParts.add(ENGINE.SnakeBody, {
			x: 300,
			y: this.y,
			decalage: 0,
			image: "head.png",
			width: this.headVisualWidth,
			height: this.headVisualHeight,
			id: 0
		});

		this.head.create();
		this.bodyParts.call("translate", this.x, this.y) // And we put each ball at its start position
	},
	step: function (delta) {
		if (this.stopped) {
			return;
		}
		this.move(delta); // go right then left etc.
		this.head.translate(this.x, this.y);
		var len = this.arrayTreshold;
		for (var i = 1; i <= this.size; i++) {
			var body = this.bodyParts.get(["id", "equals", i])[0];
			var timeAgo = i * this.propagationSpeed;

			var position = (this.oldPositions.filter(function (position) {
				return position.isTheOne(timeAgo, len);
			})[0]);
			if (position) {
				var correctedPosition = position.findCorrectedPosition(timeAgo);
				body.translate(correctedPosition, this.y); // and move it in a array of old poisitions of the snake
			}
		}
		this.bodyParts.call("step", delta);
	},
	move: function (delta) {
		if (this.direction && this.x + this.headWidth / 2 >= app.width - this.borderWidth) {
			this.direction = 0;
		}
		if (!this.direction && this.x - this.headWidth / 2 <= 0 + this.borderWidth) {
			this.direction = 1;
		}
		if (this.direction) {
			this.x += delta * this.speed;
		}
		if (!this.direction) {
			this.x -= delta * this.speed;
		}
		this.oldPositions.push(new ENGINE.Position({
			collection: this.oldPositions,
			position: this.x,
			deltaTime: delta
		}));
		if (this.oldPositions.length == this.arrayTreshold) {
			this.oldPositions.shift();
			ENGINE.Position.IdOffset += 1;
		}
	},
	reverse: function () {
		if (!this.mute) {
			app.audio.play("reverse");
		}
		this.direction = !this.direction;
	},
	fall: function () {
		this.bodyParts.call("fall")
	},
	remove: function () {
		delete this.oldPositions;
		this.bodyParts.call("remove");
	},
	stop: function () {
		this.stopped = true;
	}

}