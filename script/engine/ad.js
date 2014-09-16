ENGINE.Ad = function (hidden) {
	var that = this;
	return;
	that.bannerHidden = hidden;
	if (that.bannerHidden) {
		console.log("HIDING ADS")
		return;
	}
	var params = {
		banners: {
			"bannerAdUnit-iPad": "agltb3B1Yi1pbmNyDQsSBFNpdGUYk8vlEww",
			"bannerAdUnit-iPhone": "agltb3B1Yi1pbmNyDQsSBFNpdGUY5dDoEww",
			"refresh": 20
		},
		fullscreen: {
			"fullscreenAdUnit-iPad": "agltb3B1Yi1pbmNyDQsSBFNpdGUYjf30Eww",
			"fullscreenAdUnit-iPhone": "450eb646ee4e4275b8a4e82a543e0375",
			"refresh": 20
		}
	}

	that.banner = CocoonJS.Ad.createBanner(params.banners);
	if (that.banner) {
		that.banner.onBannerHidden.addEventListener(function () {
			console.log("banner hidden")

		});
		that.banner.onBannerReady.addEventListener(function (width, height) {
			console.log("banner ready")
			if (that.bannerHidden) {
				return;
			}
			var rect = new CocoonJS.Ad.Rectangle(window.innerWidth / 2 - width / 2, window.innerHeight - height, width, height);
			that.banner.setRectangle(rect);
			that.banner.showBanner();
		});
		that.banner.refreshBanner();
	}
	that.fullscreen = CocoonJS.Ad.createFullscreen(params.fullscreen);
	if (that.fullscreen) {
		that.fullscreen.refreshFullScreen();
	}

}
ENGINE.Ad.prototype.hideBanner = function () {
	if (that.bannerHidden) {
		return;
	}
	that.banner.hideBanner();
	that.bannerHidden = true;
}
ENGINE.Ad.prototype.showFullscreenAdd = function () {
	var that = this;
	if (that.bannerHidden) {
		return;
	}
	that.banner.refreshBanner();
	that.fullscreen.showFullScreen();
}