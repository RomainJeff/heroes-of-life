var pauseEvent = {};


/**
 * Quand un utilisateur utilise sa pause
 * @param object socket
 *
 */
pauseEvent.request = function (socket) {

    if (global.models.users.canPause(socket.id)) {
        var adversary = global.models.users.getAdversary(socket.id);

        global.controllers.game.pauseGame(function () {
            var pausesLeft = global.models.users.deletePause(socket.id);

            socket.emit('pause:response', {
                state: true,
                pauses: pausesLeft
            });

            global.models.sessions.get(adversary).emit('game:paused', pausesLeft);

            // On previent les spectateurs
            global.models.sessions.getSpectators(function (spectators) {
                for (spectator in spectators) {
                    global.models.sessions.get(spectator).emit('game:paused', global.models.users.export());
                }
            });
        });
    } else {
        // On refuse la pause
        socket.emit('pause:response', {
            state: false,
            pauses: global.models.users.getPauses(socket.id)
        });
    }
};


/**
 * Quand l'utilisateur valide sa grille de pause
 * @param object socket
 * @param array grille
 *
 */
pauseEvent.validate = function (socket, grille) {
    var adversary = global.models.users.getAdversary(socket.id);
    var indexPlayer = global.models.users.getPlaying(socket.id).index;
    var countCellsActual = global.controllers.grille.cellsPlayer(indexPlayer);
    var countCellsNew = global.controllers.grille.cellsPlayer(indexPlayer, grille);

    // Si aucune cellule n'est en trop alors on valide la grille
    if (countCellsActual >= countCellsNew) {
        global.controllers.grille.grille = grille;
    }

    // On redemarre le jeu
    global.controllers.game.startGame(function () {
        global.events.user.gameInterval(adversary, socket);
    });
};



module.exports = pauseEvent;
