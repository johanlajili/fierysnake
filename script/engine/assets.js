ENGINE.Assets = function(loader) {
	this.loader = loader;
	this.paths = {
		images: "assets/images/",
		animations: "assets/animations/"
	};
}

ENGINE.Assets.prototype = {
	addImages: function(filenames){
		for (var i=0; i<filenames.length; i++){
			this.add(filenames[i]);
		}
	},
	addImage: function(filename){
		this.loader.add(this.paths.images + filename);
	},
	addAnimation: function(filename){
		this.loader.add(this.paths.animations + filename)
	}
}