ENGINE.Score = Compose(ENGINE.TextEntity, {
		string: "0",
		font: "30px Arial black",
		fill: "#dab42f",
		stroke: "#b9552b",
		layer: "foreground",
		create: Compose.after(function(){
			this.value = 0;
			this.text.position.x = this.x
			this.text.position.y = this.y
			this.text.anchor.x = 1;
		}),

		step: function(delta) {
			
		},

		plus: function(value){
			this.value+= value;
			this.text.setText(this.value)
		},
		disparition: function(){
			this.remove();
		}

});