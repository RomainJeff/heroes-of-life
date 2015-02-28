var io = require('socket.io')(8080);

/** Model **/
var usersModelConstructor = require('./libraries/models/usersModel.js')();
var charactersModelConstructor = require('./libraries/models/charactersModel.js')();

global.models = {
    sessions    : require('./libraries/models/sessionsModel.js'),
    users       : new usersModelConstructor(),
    characters  : new charactersModelConstructor(),
    grilles     : require('./libraries/models/grillesModel.js')
};


/** Controllers **/
var gameControllerConstructor = require('./libraries/controllers/gameController.js')();
var grilleControllerConstructor = require('./libraries/controllers/grilleController.js')();

global.controllers = {
    game:   new gameControllerConstructor(),
    grille: new grilleControllerConstructor()
};


/** Events **/
global.events = {
    game: require('./libraries/events/game.js')
};


/** Ecoute les evenements **/
io.on('connection', function (socket) {

    // Ajout de la session au sessionModel
    global.models.sessions.add(socket.id, socket);


    /********************
     * EVENTS LISTENERS
     ********************/

    // Quand le client nous demande de jouer
    // en ligne
    socket.on('user:request', function() {
        global.events.game.playOnline(socket);
    });


    // Quand l'utilisateur choisis son personnage
    socket.on('character:choose', function (character) {
        global.events.game.selectChar(socket, character);
    });


    // Quand un joueur envoie sa grille
    socket.on('user:ready', function (grille) {
        global.events.game.ready(socket, grille);
    });


    // Quand un joueur mets pause
    socket.on('game:pause', function () {
        global.events.game.pause(socket);
    });


    // Quand le client se deconnecte
    socket.on('disconnect', function () {
        global.events.game.logOut(socket);
    });

});