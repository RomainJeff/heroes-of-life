/**
 * Initialise le controller avec la cellule
 * @param grilleController grilleController
 * @param int line
 * @param int row
 *
 */
var neighborController = function(grilleController, line, row){
    this.grilleController = grilleController;
    this.line = line;
    this.row = row;
    this.neighbors = 0;
};


/**
 * Retourne le nombre de cellules voisines vivantes
 * @return int
 *
 */
neighborController.prototype.getAlive = function () {
    if (
        !this.isValidIndex(this.line - 1) || !this.isValidIndex(this.row - 1) ||
        !this.isValidIndex(this.line + 1) || !this.isValidIndex(this.row + 1)
    ) {
        return this.neighbors;
    }


    if (this.grilleController.get()[this.line][this.row - 1] > 0) this.neighbors++;
    if (this.grilleController.get()[this.line][this.row + 1] > 0) this.neighbors++;

    if (this.grilleController.get()[this.line - 1][this.row - 1] > 0) this.neighbors++;
    if (this.grilleController.get()[this.line + 1][this.row - 1] > 0) this.neighbors++;

    if (this.grilleController.get()[this.line - 1][this.row + 1] > 0) this.neighbors++;
    if (this.grilleController.get()[this.line + 1][this.row + 1] > 0) this.neighbors++;

    if (this.grilleController.get()[this.line - 1][this.row] > 0) this.neighbors++;
    if (this.grilleController.get()[this.line + 1][this.row] > 0) this.neighbors++;

    return this.neighbors;
};

/**
 * Verifie la validite de l'index courant
 * @param int index
 * @return boolean
 *
 */
neighborController.prototype.isValidIndex = function (index) {
    return (
        (index >= 0) &&
        (index < this.grilleController.getSize()[0])
    );
};



module.exports = function () {
    return neighborController;
};
