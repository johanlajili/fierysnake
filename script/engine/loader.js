ENGINE.Loader = function(){
	this.items = [];
	this.callback = function(){};
}

ENGINE.Loader.prototype = {
	add: function(args){
		if (args instanceof Array){
			this.items = this.items.concat(args)
		}else{
			this.items.push(args);
		}
	},
	load: function(){
		var loader = this;
		this.pixiLoader = new PIXI.AssetLoader(this.items);
		this.pixiLoader.onComplete = function(){
			loader.callback();
		};
		this.pixiLoader.load();
	},
	ready: function(callback){
		this.callback = callback
	}


}