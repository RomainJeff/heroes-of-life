var grilleController = function() {

    this.grille = [];
    this.grilleTempo = [];
    this.grilleNotMerged = [];
};


/**
 * Defini l'etat d'une cellule
 * @param int line
 * @param int row
 * @param bool value
 *
 */
grilleController.prototype.setRow = function (line, row, value) {
    this.grille[line][row] = value;
};


/**
 * Defini l'etat d'une cellule temporaire
 * @param int line
 * @param int row
 * @param bool value
 *
 */
grilleController.prototype.setRowTempo = function (line, row, value) {
    this.grilleTempo[line][row] = value;
};


/**
 * Recupere les grilles pas merge
 * @return object
 *
 */
grilleController.prototype.getNotMerged = function () {
    return this.grilleNotMerged;
};


/**
 * Ajoute une grille a merger
 * @param int index
 * @param object grille
 *
 */
grilleController.prototype.addNotMerged = function (index, grille) {
    if (index) index = 1;
    else index = 0;

    this.grilleNotMerged[index] = grille;
};


/**
 * Recupere la grille
 * @return array
 *
 */
grilleController.prototype.get = function () {

    return this.grille;
};


/**
 * Recupere la grille temporaire
 * @return array
 *
 */
grilleController.prototype.getTempo = function () {

    return this.grilleTempo;
};


/**
 * Retourne la taille de la grille
 * @return object (0: line, 1: row)
 *
 */
grilleController.prototype.getSize = function () {
    return [
        this.get().length,
        this.get()[0].length
    ]
};


/**
 * Merge les deux grilles pour n'en former qu'une seule
 * @param object grilles
 * @return object
 *
 */
grilleController.prototype.merge = function (grilles) {
    for (i = 0; i < grilles.length; i++) {
        var oldLine = 0;
        
        // On parcour les lignes
        for (line = (i * (Math.ceil(15 / 2))); line < (Math.ceil(15 / (2 - i))); line++) {
            this.grille[line] = [];

            // On parcours les rows
            for (row = 0; row < grilles[i][oldLine].length; row++) {
                // On definie les cellules vivantes et mortes
                // Joueur1 = 1 = vivante
                // Joueur2 = 2 = vivante
                if (i == 0) {
                    this.grille[line][row] = grilles[i][oldLine][row];
                } else {
                    this.grille[line][row] = (grilles[i][oldLine][row] == 1) ? 2 : 0;
                }
            }

            oldLine++;
        }
    }

    //this.grille.push(this.grille[0]); // On ajoute une ligne en +

    return this.grille;
};


/**
 * Retourne le nombre de cellule vivantes de la grille
 * @return int
 */
grilleController.prototype.countCells = function (grille, callback) {
    var cellsNumber = 0;

    for (var line = 0; line < grille.length; line++) {
        for (var row = 0; row < grille[line].length; row++) {
            cellsNumber += grille[line][row];
        }
    }

    callback(cellsNumber);
};



module.exports = function () {
    return grilleController;
};
