ENGINE.Enemy = Compose(ENGINE.MovieclipEntity, {
		animation : "assets/animations/enemyAnimation.json",
		speed: 0.25,
		height: 52,
		hitbox: {
			x1: -1,
			y1: -1,
			x2: 1,
			y2: 1
		},
		superHitbox: {
			x1: -30,
			y1: -10,
			x2: 30,
			y2: 10
		},
		create: Compose.after(function(){
			this.spine.position.x = this.x
			this.spine.position.y = this.y
			this.spine.state.setAnimationByName("Neutral", true, 0);
		}),

		step: function(delta) {

			this.y += delta*this.speed;
			this.checkCollisionWithPlayer();
			this.checkSuperCollisionWithPlayer();
			this.spine.position.x = this.x;
			this.spine.position.y = this.y;
			if (this.y > app.height){
				this.remove();
			}
			if (this.hasToGiveSuperPoints){
				if (this.spine.state.isComplete()){
					if (!this.superPointGiven){
						app.game.mainGUI.call("plus", 4);
						this.superPointGiven = true;
					}
				}
			}

		},

		checkCollisionWithPlayer : function(){
			var hit = this.hitbox;
			var snake = app.game.snake;
			if (this.y + hit.y1 > snake.y+snake.headWidth/4){
				if (!this.pointGiven){
					app.game.mainGUI.call("plus", 1)
					this.pointGiven = true;
				}
				return;
			} 
			if (this.y + hit.y2 < snake.y-snake.headWidth/4) return;
			if (this.x + hit.x1 > snake.x+snake.headWidth/4) return;
			if (this.x + hit.x2 < snake.x-snake.headWidth/4) return;

			app.game.launchGameOver();
		},
		checkSuperCollisionWithPlayer : function(){
			var hit = this.superHitbox;
			var snake = app.game.snake;
			var enemyTop = this.y + hit.y1;
			var enemyBottom = this.y + hit.y2;
			var snakeTop = snake.y-snake.headWidth/4;
			var snakeBottom = snake.y+snake.headWidth/4;


			if (enemyTop > snakeBottom) return;
			if (enemyBottom < snakeTop) return;
			
			if (this.x + hit.x1 > snake.x+snake.headWidth/4) return;
			if (this.x + hit.x2 < snake.x-snake.headWidth/4) return;
	
			if (!this.stonedAnimationPlayed){
				this.spine.state.setAnimationByName("Stoned", false)
				this.hasToGiveSuperPoints = true;
				this.stonedAnimationPlayed = true; 
			}
		}

});