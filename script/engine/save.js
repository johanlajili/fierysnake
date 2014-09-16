ENGINE.Save = function(){

}

ENGINE.Save.prototype.set = function(name, value){
	localStorage.setItem(name, value);
}

ENGINE.Save.prototype.get = function(name){
	return localStorage.getItem(name);
}