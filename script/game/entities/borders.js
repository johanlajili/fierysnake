ENGINE.Borders = Compose(ENGINE.SpriteEntity, {
    x: 160,
    y: 0,
    direction: 0,
    image: "borders.png",
    speed: 0.05,
    anchor: {
        x: 0.5,
        y: 0
    },
    step: function(delta) {
        if (this.isMoving) {
            this.sprite.position.y += this.speed * delta
            if (this.sprite.position.y >= app.height) {
                this.sprite.position.y -= app.height * 2
            }
        }
    },

    move: function() {
        this.isMoving = true;
    },

    stop: function() {
        this.isMoving = false;
    }

});