ENGINE.TextEntity = function(args) {
	_.extend(this, args);
	
}

ENGINE.TextEntity.prototype = {
	create : function(){
		if (this.string){
			this.text = new PIXI.Text(this.string || "===", {font: this.font || "50px Arial", fill: "#dab42f", stroke: "#b9552B", strokeThickness: 6});
			app[this.layer || "midground"].addChild(this.text);
		}
	},

	step: function(delta) {

	},

	remove: function(){
		this._remove = true;
		this.collection.dirty = true;
		app[this.layer || "midground"].removeChild(this.text)
	}

};
ENGINE.TextEntity.prototype.addEvents = ENGINE.InteractiveEntity.prototype.addEvents;