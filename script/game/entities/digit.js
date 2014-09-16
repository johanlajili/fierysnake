ENGINE.Digit = Compose(ENGINE.SpriteEntity, {
    x: 200,
    y: 200,
    anchor: {
    	x: 0.5,
    	y: 0.5
    },
    width: this.size,
    height: this.size,
    layer: "foreground",
    image: "0.png",
    step: function(delta) {

    },
    create: Compose.before(function(){
    	this.textures = [];
    	for (var i=0; i<=9; i++){
    		this.textures.push(new PIXI.Texture.fromImage(i+".png"));
    	}
    }),
    changeDigit : function(value, x, y){
    	this.sprite.setTexture(this.textures[value])
        this.sprite.position.x = x;
    	this.sprite.position.y = y;
    }
});