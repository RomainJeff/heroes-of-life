module.exports = {
    grilles: {},

    add: function (id, grille) {
        this.grilles[id] = grille;
    },

    delete: function (id) {
        delete this.grilles[id];
    },

    get: function (id) {
        return this.grilles[id];
    }
};