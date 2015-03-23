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

    // On redemarre le jeu
    global.controllers.game.startGame(function () {
        global.events.user.gameInterval(adversary, socket);
    });
};



module.exports = pauseEvent;
