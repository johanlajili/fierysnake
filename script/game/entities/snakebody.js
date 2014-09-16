ENGINE.SnakeBody = Compose(ENGINE.SpriteEntity, {
    decalage: 0,
    delay: 10,
    velocity: 0,
    image: "body.png",
    layer: "midforeground",
    create: Compose.after(function() {
        this.velocity = 0;
    }),
    setMaxLengthOldXPositions: function(value) {},
    step: function(delta) {
        if (this.falling) {
            this.velocity += 0.001 * (app.game.snake.size - this.id);
            this.y += this.velocity * delta;
            this.sprite.position.y = this.y;
        }
    },
    translate: function(x, y) {
        this.sprite.position.x = this.x = x;
        this.sprite.position.y = this.y = y + this.decalage;
    },
    moveFake: function(x, y) {
        if (this.image == "head.png") return;
        this.sprite.position.x = this.x +  Math.random()*3;
        this.sprite.position.y = this.y + Math.random()*3 ;
    },
    fall: function() {
        this.falling = true;
    }

});