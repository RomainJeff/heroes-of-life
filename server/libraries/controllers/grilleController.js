var grilleController = function() {

    this.grille = [];
    this.grilleTempo = [];
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
    // On parcour les grilles
    for (i = 0; i < grilles.length; i++) {
        // On parcour les lignes
        for (line = (i * grilles[i].length / 2); line < grilles[i].length / (2 - i); line++) {
            // On parcours les rows
            for (row = 0; row < grilles[i][line].length; row++) {

            }
        }
    }

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