ENGINE.Collection = function(parent) {
    this.parent = parent;

    this.index = 0;

    this.dirty = false;

}
ENGINE.Collection.prototype = new Array();

_.extend(ENGINE.Collection.prototype, {

    add: function(constructor, args) {
        try {
            var entity = new constructor(_.extend({
                collection: this,
                index: this.index++
            }, args))
        } catch (err) {
            console.error("The entity type is not know. Have you add the file in index.html? What about the name of the ENGINE property?")
        }

        this.push(entity);

        return entity;
    },

    clean: function() {
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i]._remove) {
                this.splice(i--, 1);
                len--;
            }
        }
    },

    step: function(delta) {
        if (this.dirty) {
            this.dirty = false;

            this.clean();

            this.sort(function(a, b) {
                return (a.zIndex | 0) - (b.zIndex | 0);
            })
        }
        this.call("step", delta);
    },

    call: function(method) {
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i][method]) this[i][method].apply(this[i], args);
        }
    },

    apply: function(method, args) {
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i][method]) this[i][method].apply(this[i], args);
        }
    },

    get: function() {

        var tableau = Array.prototype.slice.call(arguments, 0);

        var results = [];
        for (var i = 0, len = this.length; i < len; i++) {
            for (var e = 0, tlen = tableau.length; e < tlen; e++) {
                var test = tableau[e];

                if (e == tableau.length - 1) {
                    if (this.test(i, test[0], test[1], test[2])) {

                        results.push(this[i]);
                    }
                } else {
                    if (!this.test(i, test[0], test[1], test[2])) {
                        break;
                    }
                }
            }
        }
        if (results.length == 0) {
            return false;
        }
        var collecResult = new ENGINE.Collection(this);
        for (var i = 0, len = results.length; i < len; i++) {
            collecResult.push(results[i]);
        }
        return collecResult
    },

    test: function(elem, id, operation, value) {

        var operations = {
            equals: function(a, b) {
                if (a == b) return true
            }
        }
        if (typeof operation == "function") {
            operation = operation;
        }
        if (typeof operation == "string") {
            operation = operations[operation];
        }

        if (operation(this[elem][id], value)) return true;
        return false;

    }
});