var globalEvent = {};


/**
 * Quand un utilisateur se deconnecte
 * @param object socket
 *
 */
globalEvent.logOut =  function (socket) {

    // Si le client etait un spectateur
    if (global.models.sessions.isSpectator(socket.id)) {
        console.log('Deconnexion spectateur: '+ socket.id);
        global.models.sessions.deleteSpectator(socket.id);
    }

    // Si le client etait en jeu
    if (global.models.users.exists(socket.id, true)) {
        console.log('Deconnexion joueur: '+ socket.id);

        // Suppression du joueur courant
        global.models.users.deletePlaying(socket.id);
        global.models.characters.delete(socket.id);

        // Nombre de nouvelle connexion autorisee
        var newConnectionAuthorized = 1;

        // Si le jeu est en cours
        // On deconnecte l'adversaire
        if (global.controllers.game.isPlaying() === true) {
            newConnectionAuthorized = 2;

            // On recupere l'adversaire
            var adversary = global.models.users.getAdversary(socket.id);

            // On le deconnecte si il y en a un
            if (adversary) {
                global.models.sessions.get(adversary).emit('user:logout');
                // Suppression de l'adversaire
                global.models.users.deletePlaying(adversary);
                global.models.characters.delete(adversary);
                global.controllers.game.stopGame();

                // On previent les spectateurs
                global.models.sessions.getSpectators(function (spectators) {
                    for (spectator in spectators) {
                        global.models.sessions.get(spectator).emit('game:end', 'nobody');
                    }
                });
            }
        }

        // On envoie le droit de jouer aux X prochains joueurs
        for (id in global.models.users.getWaiting()) {
            if (id >= newConnectionAuthorized) {
                break;
            }

            var socketID = global.models.users.getWaitingFromIndex(id);
            global.models.sessions.get(socketID).emit('user:retryPlay');
            global.models.users.deleteWaiting(socketID);
        }

    } else if (global.models.users.exists(socket.id, false)) {
        console.log('Deconnexion joueur en attente: '+ socket.id);
        global.models.users.deleteWaiting(socket.id);
    }

    // Suppression de la session
    global.models.sessions.delete(socket.id);
};



module.exports = globalEvent;
