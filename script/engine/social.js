ENGINE.Social = function () {
	var that, gameCenter, socialService, isLoggedIn;
	that = this;
	that.leaderboards = {};
	if (CocoonJS.nativeExtensionObjectAvailable) {
		gameCenter = CocoonJS.Social.GameCenter;
		socialService = gameCenter.getSocialInterface();
		isLoggedIn = false;
		socialService.login(function () {
			isLoggedIn = true;
			console.log("callback login 1");
		});
		socialService.onLoginStatusChanged.addEventListener(function (loggedIn, error) {
			isLoggedIn = true;
			console.log("onLoginStatusChanged: " + loggedIn + " " + socialService.isLoggedIn());
		});
		that.submitScore = function (score, level) {
			console.log("submitScore", score);
			if (isLoggedIn) {
				socialService.submitScore(score, function () {
					console.log("score submitted")
				}, {
					leaderboardID: level
				});
			} else {
				console.log("not logged in, score not sent");
			}

		}
		that.showLeaderboards = function () {
			socialService.showAchievements();
		}
		that.showLeaderboard = function (id) {
			socialService.showLeaderboard(undefined, {
				leaderboardID: id
			});
		}
	} else {
		that.submitScore = function () {};
		that.showLeaderboards = function () {};
		that.showLeaderboard = function () {};
	}
}