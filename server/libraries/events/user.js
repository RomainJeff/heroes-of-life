var userEvent = {};


/**
 * Quand un utilisateur demande a jouer
 * @param object socket
 *
 */
userEvent.request = function (socket) {
    // Si il reste de la place on place le joueur
    // En ligne sinon on le place en attente
    if (global.models.users.getCountPlaying() < 2) {
        global.models.users.addPlaying(socket.id);
        socket.emit('user:canPlay', true);
    } else {
        global.models.users.addWaiting(socket.id);
        socket.emit('user:canPlay', false);
    }
};



/**
 * Quand un utilisateur est prêt
 * @param object socket
 * @param array grille
 *
 */
userEvent.ready = function (socket, grille) {
    global.controllers.grille.countCells(grille, function (count) {
        if (count > 25 || count < 3) {
            var message = (count > 25) ? "You have used to much cells" : "You haven't used enough cells";
            socket.emit('user:canStart', {state: false, message: message});
        } else {
            // On definie l'etat du joueur actuel comme pret a commencer
            global.models.users.setReady(socket.id, true);
            // On ajoute la grille du joueur
            global.controllers.grille.addNotMerged(global.models.users.getPlaying(socket.id).index, grille);


            // Si l'adversaire est deja pret on envoie directement sur la page de combat
            // et on demande a l'adversaire d'afficher la page de combat (avec le jeu de la vie)
            if (global.models.users.isReady(socket.id)) {
                var adversary = global.models.users.getAdversary(socket.id);

                global.models.sessions.get(adversary).emit('user:adversaryReady', {
                    infos: {
                        grille: global.controllers.grille.merge(global.controllers.grille.getNotMerged()),
                        users: [
                            global.models.users.export(adversary),
                            global.models.users.export(socket.id)
                        ]
                    }
                });

                socket.emit('user:canStart', {
                    state: true,
                    page: 'fight',
                    infos: {
                        grille: global.controllers.grille.get(),
                        users: [
                            global.models.users.export(socket.id),
                            global.models.users.export(adversary)
                        ]
                    }
                });


                // On demarre le jeu si il est pas deja demarre
                if (!global.controllers.game.isPlaying()) {
                    global.controllers.game.startGame(function () {
                        global.events.user.gameInterval(adversary, socket);
                    });
                }

            } else {
                socket.emit('user:canStart', {state: true, page: 'waiting'});
            }
        }
    });
};


/**
 * L'execution du jeu
 * @param string adversary
 * @param string socket
 *
 */
userEvent.gameInterval = function (adversary, socket) {
    global.controllers.game.update(function (grille) {

        // Verifie si le jeu est fini
        global.controllers.game.isEnded(grille, function (winner) {
            socket.emit('game:end', winner);
            global.models.sessions.get(adversary).emit('game:end', winner);

            global.controllers.game.stopGame();
        });

        socket.emit('game:refresh', grille);
        global.models.sessions.get(adversary).emit('game:refresh', grille);
    });
};



module.exports = userEvent;
