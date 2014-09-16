ENGINE.SpriteEntity = function(args) {
	_.extend(this, args);
	
}

ENGINE.SpriteEntity.prototype = {
	create : function(){
		if (this.image || this.tile){
			if (this.image){
				this.texture = new PIXI.Texture.fromImage(this.image);
				this.sprite = new PIXI.Sprite(this.texture);	
			}
			if (this.tile){
				this.texture = new PIXI.Texture.fromImage(this.tile);
				this.sprite = new PIXI.TilingSprite(this.texture, this.width, this.height);
			}
			this.sprite.anchor.x = 0.5;
			this.sprite.anchor.y = 0.5;
			if (this.scale){
				this.sprite.scale = this.scale;
			}
			if (this.anchor){
				this.sprite.anchor.x = this.anchor.x;
				this.sprite.anchor.y = this.anchor.y;
			}
			this.sprite.position.x = this.x;
			this.sprite.position.y = this.y;
			if (this.width) this.sprite.width = this.width;
			if (this.height) this.sprite.height = this.height;
			app[this.layer || "midground"].addChild(this.sprite);
			this.addEvents();
		}
	},

	step: function(delta) {

	},

	remove: function(){
		this._remove = true;
		this.collection.dirty = true;
		app[this.layer || "midground"].removeChild(this.sprite)
	},
	putOnTop : function(){
		this.remove();
		this.create();
	}

};
ENGINE.SpriteEntity.prototype.addEvents = ENGINE.InteractiveEntity.prototype.addEvents;