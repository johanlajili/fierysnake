ENGINE.tunnelAlgorithm = function (args) {

}

ENGINE.tunnelAlgorithm.prototype.pointMapFromCurve = function (curve) {
	var leftPart = [];
	var rightPart = [];
	for (var i = 0; i < curve.length; i++) {
		var curveI = curve[i];
		leftPart.push({
			x: curveI.x,
			y: curve.height - curveI.y
		});
		rightPart.push({
			x: curveI.x + curveI.holeWidth,
			y: curve.height - curveI.y
		})
	}
	leftPart.push({
		x: app.game.snake.borderWidth,
		y: leftPart[leftPart.length - 1].y
	});
	rightPart.push({
		x: app.width - app.game.snake.borderWidth,
		y: leftPart[leftPart.length - 1].y
	});

	var leftBorderStart = {
		x: curve[0].x + ((curve[1].x - curve[0].x) > 0 ? -4 : 4),
		y: leftPart[0].y + 4
	};
	var leftBorderEnd = {
		x: curveI.x + ((curve[curve.length - 1].x - curve[curve.length - 2].x) > 0 ? 4 : -4),
		y: leftPart[leftPart.length - 1].y - 4
	};
	var rightBorderStart = {
		x: curve[0].x + curve[0].holeWidth + ((curve[1].x - curve[0].x) > 0 ? -4 : 4),
		y: leftPart[0].y + 4
	};
	var rightBorderEnd = {
		x: curveI.x + curveI.holeWidth + ((curve[curve.length - 1].x - curve[curve.length - 2].x) > 0 ? 4 : -4),
		y: leftPart[leftPart.length - 1].y - 4
	};
	return {
		leftPart: leftPart,
		rightPart: rightPart,
		leftBorderEnd: leftBorderEnd,
		leftBorderStart: leftBorderStart,
		rightBorderStart: rightBorderStart,
		rightBorderEnd: rightBorderEnd
	};
}

ENGINE.tunnelAlgorithm.prototype.getCurve = function (args) {
	var balance = args.balance;
	this.opening = randomInt(balance.opening.min, balance.opening.max);
	this.destination = randomInt(balance.destination.min, balance.destination.max);
	this.holeWidth = randomInt(balance.holeWidth.min, balance.holeWidth.max);
	this.count = randomInt(balance.count.min, balance.count.max);
	this.frequencyMin = randomInt(balance.frequencyMin.min, balance.frequencyMin.max);
	this.frequencyMax = randomInt(this.frequencyMin + balance.frequencyMax.min, balance.frequencyMax.max);
	_.extend(this, args);
	if (app.width - app.game.snake.borderWidth - this.holeWidth - this.opening < 0) {
		this.opening = 150
	} else if (this.opening < app.game.snake.borderWidth) {
		this.opening = 150
	}
	var curve = [];
	curve.push({
		x: this.opening,
		y: 0,
		holeWidth: this.holeWidth
	});

	var xCursor = this.opening;
	var yCursor = 0;
	var direction = Math.random() >= 0.5 ? 1 : -1;
	var height = 0;
	for (var i = 0; i < this.count; i++) {
		var tempDiff;
		var diff = Math.floor(Math.random() * (this.frequencyMax - this.frequencyMin)) + this.frequencyMin;

		if (xCursor + diff * direction > app.width - app.game.snake.borderWidth - this.holeWidth) {
			tempDiff = app.width - app.game.snake.borderWidth - this.holeWidth - xCursor;
			diff = tempDiff;
		} else
		if (xCursor + diff * direction < app.game.snake.borderWidth) {
			tempDiff = xCursor - app.game.snake.borderWidth;
			diff = tempDiff;
		}
		if (diff < 0) {
			debugger;
		}
		var y = yCursor + diff;
		var x = xCursor + diff * direction;
		direction *= -1;

		curve.push({
			x: x,
			y: y,
			holeWidth: this.holeWidth
		});
		yCursor = y;
		xCursor = x;
		height = y;
		this.destination = x;
	}
	curve.height = height;
	curve.opening = this.opening;
	curve.destination = this.destination;
	return curve;
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}