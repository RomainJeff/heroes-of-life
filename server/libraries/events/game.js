module.exports = {

    playOnline: function (socket) {        
        // Si il reste de la place on place le joueur
        // En ligne sinon on le place en attente
        if (global.models.users.getCountPlaying() < 2) {
            global.models.users.addPlaying(socket.id);
            socket.emit('user:canPlay', true);
        } else {
            global.models.users.addWaiting(socket.id);
            socket.emit('user:canPlay', false);
        }
    },

    selectChar: function (socket, character) {
        // Si le personnage n'est pas deja pris
        if (!global.models.characters.isTaken(character)) {
            global.models.characters.add(socket.id, character);
            global.models.users.setCamp(socket.id, function (index) {
                socket.emit('character:isValid', {state: true, character: character, position: index});
            })
        } else {
            socket.emit('character:isValid', {state: false});
        }
    },

    ready: function (socket, grille) {
        global.controllers.grille.countCells(grille, function (count) {
            if (count > 25 || count < 3) {
                var message = (count > 25) ? "You have used to much cells" : "You haven't used enough cells";
                socket.emit('user:canStart', {state: false, message: message});
            } else {
                socket.emit('user:canStart', {state: true, page: 'waiting'});
            }
        });
    },

    pause: function (socket) {

    },

    logOut: function (socket) {        
        // Si le client etait en jeu
        if (global.models.users.exists(socket.id, true)) {
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
                    global.models.characters.delete(socket.id);
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
            global.models.users.deleteWaiting(socket.id);
        }

        // Suppression de la session
        global.models.sessions.delete(socket.id);
    }
};
