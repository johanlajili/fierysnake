
ENGINE.Position = function(args){
	this.deltaTime = 0;
	this.position = 0;
	this.collection = [];
	_.extend(this, args);
	this.id = ENGINE.Position.Id;
	 if (this.collection[this.id-ENGINE.Position.IdOffset-1]){
	 	this.collection[this.id-ENGINE.Position.IdOffset-1].next = this;
	 }
	ENGINE.Position.Id++;
	ENGINE.Position.DeltaTimeTotal += this.deltaTime;
	this.deltaTimeSum = ENGINE.Position.DeltaTimeTotal;
	var DTS = this.deltaTimeSum;
	this.isTheOne = function(value, len){
		var trueId = this.id - ENGINE.Position.IdOffset
		return DTS <= ENGINE.Position.DeltaTimeTotal - value && this.next.deltaTimeSum > ENGINE.Position.DeltaTimeTotal - value;
	}
};

ENGINE.Position.DeltaTimeTotal = 0;
ENGINE.Position.Id = 0;
ENGINE.Position.IdOffset = 0;
ENGINE.Position.prototype.restart = function(){
	ENGINE.Position.DeltaTimeTotal = 0;
	ENGINE.Position.Id = 0;
	ENGINE.Position.IdOffset = 0;
}
ENGINE.Position.prototype.isInWindow = function(value, len){
	var trueId = this.id - ENGINE.Position.IdOffset
	 if ( trueId <= len - value/25 - 1 && trueId >= len - value/25 + 1){
	 	return false;
	 }
	return true;
}

ENGINE.Position.prototype.findCorrectedPosition = function(value){
	if (!this.next) return;
	var move = this.next.position - this.position;// 7.5
	var delta = this.next.deltaTime;// 50
	var median = ENGINE.Position.DeltaTimeTotal - value - this.deltaTimeSum; // 5
	return (median * move / delta) + this.position;
}