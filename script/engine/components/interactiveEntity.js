ENGINE.InteractiveEntity = function(args) {

	_.extend(this, args);
	
}

ENGINE.InteractiveEntity.prototype = {

	addEvents : function(){
		var events = ["mouseover", "mouseout", "mousedown", "mouseup", "click", "touchstart", "touchend", "tap"];
		for (var i=0; i<events.length; i++){
			var functionName = "on" + events[i][0].toUpperCase() + events[i].slice(1)
			if (this[functionName]){
				this.spine.setInteractive(true);
				var that = this;
				this.spine[events[i]] = (function(arg) { return function() {that[arg]()}; })(functionName) //some closure vodoo
				
				
			}
		}
	}

};