var schemaController = {
    grilles: [],
    counter: 0
};


/**
 * On ajoute une grille a l'historique
 * @param array grille
 *
 */
schemaController.stock = function (grille) {
    this.counter = this.counter % 6;
    this.grilles[this.counter] = grille;

    this.counter++;
};


/**
 * Reset l'objet
 *
 */
schemaController.reset = function () {
    this.grilles = [];
    this.counter = 0;
};


/**
 * Verifie si la grille se repete
 * @param array grille
 * @return bool
 *
 */
schemaController.hasSchema = function (grille) {
    for (i in this.grilles) {
        var compatibilityPoints = 0;

        for (line in this.grilles[i]) {
            for (row in this.grilles[i][line]) {
                // Si le row est le meme on ajoute un point de compatibilite
                if (grille[line][row] == this.grilles[i][line][row]) {
                    compatibilityPoints++;
                }
            }
        }

        if ((compatibilityPoints >= (grille[0].length * grille.length)) && this.counter > 3) {
            return true;
        }
    }

    // On stock la grille
    this.stock(grille);

    return false;
};



module.exports = function () {
    return schemaController;
};
