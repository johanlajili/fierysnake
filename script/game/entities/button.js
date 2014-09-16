ENGINE.Button = Compose(ENGINE.MovieclipEntity, {
    animation: this.animation,
    layer: "foreground",
    create: Compose.after(function() {
        this.spine.position.x = this.x
        this.spine.position.y = this.y
        this.spine.state.setAnimationByName("Apparition", this.firstloop);
        if (this.playNeutral) this.spine.state.addAnimationByName("Neutral", true, 0);
    }),

    step: function(delta) {
        if (this.isRemoving && this.spine.state.isComplete()) {
            this.remove();
        }
    },
    onClick: function() {
    },
    removeAfterAnim: function() {
        this.isRemoving = true;
    }

});