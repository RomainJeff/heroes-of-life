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
    grille: new grilleControllerConstructor(),
    game:   new gameControllerConstructor()
};


/** Events **/
global.events = {
    user: require('./libraries/events/user.js'),
    global: require('./libraries/events/global.js'),
    pause: require('./libraries/events/pause.js'),
    character: require('./libraries/events/character.js'),
    spectator: require('./libraries/events/spectator.js')
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
         global.events.user.request(socket);
     });


    // Quand l'utilisateur choisis son personnage
    socket.on('character:choose', function (character) {
        global.events.character.select(socket, character);
    });


    // Quand un joueur envoie sa grille
    socket.on('user:ready', function (grille) {
        global.events.user.ready(socket, grille);
    });


    // Quand un joueur mets pause
    socket.on('pause:request', function () {
        global.events.pause.request(socket);
    });

    // Quand un joueur valide pause
    socket.on('pause:validate', function (grille) {
        global.events.pause.validate(socket, grille);
    });


    // Quand un spectateur arrive
    socket.on('spectator:login', function() {
        global.events.spectator.login(socket);
    });


    // Quand le client se deconnecte
    socket.on('disconnect', function () {
        global.events.global.logOut(socket);
    });

});
