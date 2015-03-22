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
    this.neighbors = {
        total: 0,
        0: 0,
        1: 0
    };
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

    // Joueur 1
    this.neighbors[0] = this.getPlayer(1);
    // Joueur 2
    this.neighbors[1] = this.getPlayer(2);
    // Total
    this.neighbors.total = this.neighbors[0] + this.neighbors[1];

    return this.neighbors;
};


/**
 * Retourne le nombre de voisins d'un joueur donnee
 * @param int value
 * @return int
 *
 */
neighborController.prototype.getPlayer = function (value) {
    var neighbors = 0;

    if (this.grilleController.get()[this.line][this.row - 1] == value) neighbors++;
    if (this.grilleController.get()[this.line][this.row + 1] == value) neighbors++;

    if (this.grilleController.get()[this.line - 1][this.row - 1] == value) neighbors++;
    if (this.grilleController.get()[this.line + 1][this.row - 1] == value) neighbors++;

    if (this.grilleController.get()[this.line - 1][this.row + 1] == value) neighbors++;
    if (this.grilleController.get()[this.line + 1][this.row + 1] == value) neighbors++;

    if (this.grilleController.get()[this.line - 1][this.row] == value) neighbors++;
    if (this.grilleController.get()[this.line + 1][this.row] == value) neighbors++;

    return neighbors;
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
