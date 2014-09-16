ENGINE.EnemyPartition = function (args) {
	this.tunnels = new ENGINE.Collection(this);

	_.extend(this, args)
}

ENGINE.EnemyPartition.prototype = {
	create: function () {
		var that = this;
		setTimeout(function () {
			app.audio.play("ready");
		}, 500)
		setTimeout(function () {
			app.audio.play("go");
			that.popEnemy({
				opening: 200,
				startOffset: 0,
				balance: that.balance
			});
		}, 2000);

	},
	popEnemy: function (args) {
		var that = app.game.tunnelsPartition;
		if (that.isStopped) return;
		this.tunnels.add(ENGINE.Tunnel, {
			x: 0,
			y: 0,
			balance: that.balance,
			curve: ENGINE.tunnelAlgorithm.prototype.getCurve({
				opening: args.opening,
				balance: that.balance
			}),
			startOffset: args.startOffset,
			onScreenDisappear: function (y) {
				that.popEnemy({
					opening: this.curve.destination,
					balance: this.balance,
					startOffset: y
				});
			}
		}).create();
	},
	step: function (delta) {
		this.tunnels.step(delta)

	},
	move: function (delta) {

	},
	callNext: function () {

	},
	stop: function () {
		this.tunnels.call("stop");
		this.isStopped = true;
	},
	remove: function () {
		this.tunnels.call("superRemove");
	}

}