var neightborControllerConstructor = require('./neighborController.js')();
var schemaController = require('./schemaController.js')();


/**
 * Constructeur
 * @param grilleController grilleController
 *
 */
var game = function () {
    this.playing = false;
    this.interval = null;
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
 * Definie l'interval de jeu
 * @param function callback
 *
 */
game.prototype.startGame = function (callback) {
    this.interval = setInterval(callback, 800);
    this.setPlaying(true);
};


/**
 * Stop le jeu
 *
 */
game.prototype.stopGame = function () {
    clearInterval(this.interval);
    this.setPlaying(false);
};


/**
 * Met a jour la grille
 * @param closure callback
 *
 */
game.prototype.update = function (callback) {
    // On parcourt les lignes
    for (line = 0; line < global.controllers.grille.getSize()[0]; line++) {
        global.controllers.grille.setRowTempo(line, 0, 0);

        // On parcourt les colonnes
        for (row = 0; row < global.controllers.grille.getSize()[1]; row++) {
            this.hasToLive(line, row);
        }
    }

    // On met a jour la grille et on execute le callback
    this.moveGrille(callback);
};


/**
 * Retranscrit la grille temporaire dans la grille de jeu
 * @param closure callback
 *
 */
game.prototype.moveGrille = function (callback) {
    //console.log('');

    // Mise a jour de la grille
    for(var i = 0; i < global.controllers.grille.getSize()[0]; ++i)
    {
        //var debugChar = "";

        for(var j = 0; j < global.controllers.grille.getSize()[1]; ++j)
        {
            //debugChar += " "+ global.controllers.grille.getTempo()[i][j];
            global.controllers.grille.setRow(i, j, global.controllers.grille.getTempo()[i][j]);
            global.controllers.grille.setRowTempo(i, j, 0);
        }

        //console.log(debugChar);
    }

    callback(global.controllers.grille.get());
};


/**
 * Determine si une cellule doit vivre ou mourrir
 * @param int line
 * @param int row
 *
 */
game.prototype.hasToLive = function (line, row) {
    // On recupere le nombre de voisins
    var neighbors = new neightborControllerConstructor(global.controllers.grille, line, row)
                    .getAlive();
    var valueAlive = (neighbors[0] > neighbors[1]) ? 1 : 2;

    // Si cellule morte
    if (global.controllers.grille.get()[line][row] == 0) {
        // Si 3 voisins = naissance
        if (neighbors.total == 3) {
            global.controllers.grille.setRowTempo(line, row, valueAlive);

        } else {
            global.controllers.grille.setRowTempo(line, row, 0);
        }
    } else {
        // Si 2 ou 3 voisins = vivante
        if (neighbors.total == 2 || neighbors.total == 3) {
            global.controllers.grille.setRowTempo(line, row, valueAlive);
        } else {
            global.controllers.grille.setRowTempo(line, row, 0);
        }
    }
};


/**
 * Verifie si le jeu est fini
 * @param callback
 *
 */
game.prototype.isEnded = function (grille, callback) {
    if (schemaController.hasSchema(grille)) {
        var cellsPlayerOne = global.controllers.grille.cellsPlayer(0);
        var cellsPlayerTwo = global.controllers.grille.cellsPlayer(1);

        // On verifie qui a le plus de cellule
        if (cellsPlayerOne > cellsPlayerTwo) {
            callback(0); // Player 1 gagne
        } else if (cellsPlayerTwo > cellsPlayerOne) {
            callback(1); // Player 2 gagne
        } else {
            callback(-1); // Egalite
        }
    } else if (cellsPlayerOne <= 0) {
        callback(1); // Player 2 gagne
    } else if (cellsPlayerTwo <= 0) {
        callback(0); // Player 1 gagne
    }
};


/**
 * Definie l'etat de jeu de la partie en cours
 * @param bool state
 *
 */
game.prototype.setPlaying = function (state) {
    this.playing = state;
};



module.exports = function () {
    return game;
};
