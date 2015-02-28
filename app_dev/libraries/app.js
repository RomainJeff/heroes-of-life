// SOCKETS
var socketInterface = new socketController('localhost:8080');

socketInterface.listen({
    'user:canPlay':         gameHomePageController.eventCanPlay,
    'character:isValid':    gameCharactersPageController.eventIsValid,
    'user:logout':          gameHomePageController.eventLogout,
    'user:retryPlay':       gameWaitingPageController.eventRetryPlay
});


// HOMEPAGE
indexController.home();


// ROUTES
routingController.addRoute('home', gameHomePageController.launch);
routingController.addRoute('characters', gameCharactersPageController.launch);
routingController.addRoute('cells', gameCellsPageController.launch);
routingController.addRoute('waiting', gameWaitingPageController.launch);
