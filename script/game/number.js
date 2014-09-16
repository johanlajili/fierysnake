ENGINE.Number = function(args){
	"use strict";
	this.x = 180;
	this.y = 100;
	this.xOffset = 0;
	this.yOffset = 0;
	this.align = "center";

	this.number = 0;
	this.fakeNumber = 0;
	this.size = 100
	_.extend(this, args);
	this.margin = this.size/2;
	this.digits = new ENGINE.Collection(this);
	var len = this.number.toString().length;
	for (var i=0; i<len; i++){
		this.digits.add(ENGINE.Digit, {
			image: this.number.toString()[i]+".png",
			y: this.y,
			width: this.size,
			height: this.size
		}).create();
	}
}

ENGINE.Number.prototype.step = function(delta){
	if (this.follow){
		this.y = this.follow.spine.position.y + this.follow.spine.skeleton.bones[1].worldY + this.yOffset;
		this.x = this.follow.spine.position.x + this.follow.spine.skeleton.bones[1].worldX + this.xOffset;
	}

	var len = this.number.toString().length;
	if (len > this.digits.length){
		this.digits.add(ENGINE.Digit,{width: this.size, height: this.size, y: this.y}).create()
	}
	if (this.align == "center"){
		var x = this.x - this.margin/2 - this.margin/2*(len-1)
	}
	if (this.align == "right"){
		var x = this.x - this.margin*(len-1)
	}
	var len = this.number.toString().length;
	for (var i=0; i<len; i++){
		this.digits[i].changeDigit(this.number.toString()[i], x + i * this.margin, this.y);
	}

}

ENGINE.Number.prototype.remove = function(){
	this.digits.call("remove");
}