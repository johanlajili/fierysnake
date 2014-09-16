ENGINE.TunnelTexture = Compose(ENGINE.SpriteEntity, {
    x: 0,
    y: 240,
    direction: 0,
    anchor: {
    	x: 0.5,
    	y: 0
    },
    speed: 0.15,
    tile: "assets/images/texture"+Math.floor(Math.random()*20)+".png",
    create: Compose.after(function(mask) {
        this.sprite.mask = mask;
    }),
    step: function(delta) {
    	if (this.isMoving) {
            this.sprite.position.y += this.speed * delta
            if (this.sprite.position.y >= app.height) {
                this.sprite.position.y -= app.height * 2
            }
        }
    },
    translate: function(y){
    	this.sprite.position.y = this.y = y;
    }
});