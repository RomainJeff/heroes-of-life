var spectatorEvent = {};


/**
 * Definie le spectateur
 * @param object socket
 * @param string character
 *
 */
spectatorEvent.login =  function (socket) {
    console.log('Nouveau spectateur: '+ socket.id);
    global.models.sessions.addSpectator(socket.id);

    // Si une partie est deja en cours on
    // l'affiche pour le spectateur
    if (global.controllers.game.isPlaying()) {
        // On previent les spectateurs
        global.models.sessions.getSpectators(function (spectators) {
            for (spectator in spectators) {
                global.models.sessions.get(spectator).emit('game:start', {
                    infos: {
                        grille: global.controllers.grille.get(),
                        users: global.models.users.export()
                    }
                });
            }
        });
    }
};



module.exports = spectatorEvent;
