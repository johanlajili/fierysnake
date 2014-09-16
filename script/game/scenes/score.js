app.game = new ENGINE.Scene({
    onenter: function() {
        this.snake = new ENGINE.Snake();
        this.snake.create();
        this.enemyPartition = new ENGINE.EnemyPartition();
        this.mainGUI = new ENGINE.Collection(this);
        this.mainGUI.add(ENGINE.Score, {
            x: 280,
            y: 50
        }).create();
        this.postGUI.call("putOnTop")
        this.postGUI.call("move")
    },

    onstep: function(delta) {
        if (this.start) this.startGame();
        this.snake.step(delta)
        this.enemyPartition.step(delta)
    },
    onkeydown: function(key) {},
    onclick: function(e) {
        this.snake.reverse();
    },
    startGame: function() {
        if (this.started) return;
        this.enemyPartition.create();
        this.started = true;
    },

});