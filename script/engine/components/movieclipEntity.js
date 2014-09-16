ENGINE.MovieclipEntity = function(args) {
    this.scale = new PIXI.Point(1, 1);
    _.extend(this, args);
}

ENGINE.MovieclipEntity.prototype = {
    create: function() {
        if (this.animation) {
            this.spine = new PIXI.Spine(this.animation);
            this.spine.scale = this.scale;
            if (this.skin) {
                this.changeSkin(this.skin);
            }
            app[this.layer || "midground"].addChild(this.spine);
            this.addEvents();
        }
    },
    changeSkin: function(skinName) {
        this.skin = skinName;
        this.spine.skeleton.setSkinByName(this.skin);
        this.spine.skeleton.setSlotsToSetupPose();
    },

    step: function(delta) {

    },

    remove: function() {
        this._remove = true;
        this.collection.dirty = true;
        app[this.layer || "midground"].removeChild(this.spine);

    }
};
ENGINE.MovieclipEntity.prototype.addEvents = ENGINE.InteractiveEntity.prototype.addEvents;