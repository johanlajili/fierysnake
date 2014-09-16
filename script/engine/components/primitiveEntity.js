ENGINE.PrimitiveEntity = function(args) {
	_.extend(this, args);
	
}

ENGINE.PrimitiveEntity.prototype = {
	create : function(){
		if (this.graphicsData){
			this.graphics = this.graphicsData();
			this.graphics.position.x = this.x;
			this.graphics.position.y = this.y;
			app.stage.addChild(this.graphics);

			this.addEvents();
		}
		else if (this.graphicsDatas){
			var graphicsDatas = this.graphicsDatas();
			this.graphicArray = [];
			for (var i=0; i<graphicsDatas.length; i++){
				var graphic = graphicsDatas[i];
				graphic.position.x = this.x;
				graphic.position.y = this.y;
				this.graphicArray.push(graphic);
				app[this.layer || "midground"].addChild(graphic);
			}
			//this.addEvents();

		} else
		{
			console.error("absence of graphics for primitive")
		}
	},

	step: function(delta) {

	},

	remove: function(){
		var that = this;
		this._remove = true;
		this.collection.dirty = true;
		if (this.graphicArray.length){
			this.graphicArray.forEach(function(graphic){
				app[that.layer || "midground"].removeChild(graphic);
			});
		} else {
			app[this.layer || "midground"].removeChild(this.graphics)
		}
	}

};
ENGINE.PrimitiveEntity.prototype.addEvents = ENGINE.InteractiveEntity.prototype.addEvents;
