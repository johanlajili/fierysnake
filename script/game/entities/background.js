ENGINE.Background = Compose(ENGINE.SpriteEntity, {
    x: 0,
    y: 0,
    anchor: {
    	x: 0,
    	y: 0
    },
    width: app.width,
    height: app.height,
    direction: 0,
    image: "background.png",

    step: function(delta) {

    }

});