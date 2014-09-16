ENGINE.Audio = function (args) {
	var that = this;
	that.soundsUri = [];
	that.soundsLoaded = 0;
	that.currentChannel = 0
	that.callback = function () {};
	that.callCallback = _.once(function () {
		that.callback();
	});
	_.extend(that, args);
	that.soundsUri.forEach(function (sound) {
		loadAudio(sound.uri, sound.name);
	});

	createjs.Sound.addEventListener("fileload", handleFileLoad);

	function handleFileLoad(event) {
		// A sound has been preloaded.
		console.log("Preloaded:", event.id, event.src);
		that.soundsLoaded++;
		if (that.soundsLoaded == that.soundsUri.length) {
			that.callCallback();
		}
	}

	function loadAudio(uri, name) {
		console.log("enter loadAudio")
		createjs.Sound.registerSound({
			id: name,
			src: uri
		});

	}

}
ENGINE.Audio.prototype.play = function (name, args) {
	var that = this;
	return createjs.Sound.play(name, args);
};

ENGINE.Audio.prototype.stop = function (soundJSInstance) {
	var that = this;
	soundJSInstance.stop();
};