/**
 * Constructeur
 * @param grilleController grilleController
 *
 */
var game = function (grilleController) {
    this.grilleController = grilleController;
    this.playing = false;
};


/**
 * Retourne l'etat de jeu
 * @return bool
 *
 */
game.prototype.isPlaying = function () {
    return this.playing;
};


/**
 * Met a jour la grille
 * @param closure callback
 *
 */
game.prototype.update = function (callback) {
    // On parcourt les lignes
    for (line = 0; line < this.grilleController.getSize()[0]; line++) {
        this.grilleController.setRowTempo(line, 0, 0);

        // On parcourt les colonnes
        for (row = 0; row < this.grilleController.getSize()[1]; row++) {
            this.grilleController.setRowTempo(line, row, this.hasToLive(line, row));
        }
    }

    // On met a jour la grille et on execute le callback
    this.grilleController.moveGrille(callback);
};


/**
 * Retranscrit la grille temporaire dans la grille de jeu
 * @param closure callback
 *
 */
game.prototype.moveGrille = function (callback) {
    // Mise a jour de la grille
    for(var i = 0; i < this.grilleController.getSize()[0]; ++i)
    {
        for(var j = 0; j < this.grilleController.getSize()[1]; ++j)
        {
            this.grilleController.setRow(i, j, this.grilleController.getTempo()[i][j]);
            this.grilleController.setRowTempo(i, j, 0);
        }
    }

    callback(this.grilleController.get());
};


/**
 * Determine si une cellule doit vivre ou mourrir
 * @param int line
 * @param int row
 *
 */
game.prototype.hasToLive = function (line, row) {
    // On recupere le nombre de voisins
    var neighbors = new neighborController(this.grilleController, line, row)
                    .getAlive();

    // Si cellule morte
    if (this.grilleController.get()[line][row] == 0) {
        // Si 3 voisins = naissance
        if (neighbors == 3) {
            this.grilleController.setRowTempo(line, row, 1);
        } else {
            this.grilleController.setRowTempo(line, row, 0);
        }
    } else {
        // Si 2 ou 3 voisins = vivante
        if (neighbors == 2 || neighbors == 3) {
            this.grilleController.setRowTempo(line, row, 1);
        } else {
            this.grilleController.setRowTempo(line, row, 0);
        }
    }
};


module.exports = function () {
    return game;
};