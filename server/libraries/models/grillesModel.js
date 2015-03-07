module.exports = {
    grilles: {},

    /**
     * Ajoute une grille aux joueurs
     * @param string id Identifiant du joueur
     * @param array grille Tableau du joueur
     *
     */
    add: function (id, grille) {
        this.grilles[id] = {
            grille: grille
        };
    },

    delete: function (id) {
        delete this.grilles[id];
    },

    get: function (id) {
        return this.grilles[id];
    },

    getGrille: function (id) {
        return this.get(id).grille;
    },

    getIndex: function (id) {
        return this.get(id).index;
    }
};
