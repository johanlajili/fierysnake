ENGINE.Scene = function(args){
	_.extend(this, args)
}

ENGINE.Scene.prototype = {
	onenter : function(){},
	onleave : function(){},
	onrender : function(){},
	onstep : function(){}
}