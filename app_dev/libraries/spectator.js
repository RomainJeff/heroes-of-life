// SOCKETS
var socketInterface = new socketController('localhost:8080');

socketInterface.listen({
    'game:start':           gameWaitingPageController.eventSpectatorStart,
    'game:refresh':         gameFightPageController.eventRefresh,
    'game:paused':          gameFightPageController.eventSpectatorGamePaused,
    'game:end':             gameFightPageController.eventSpectatorEnd
});


// HOMEPAGE
spectatorController.home();


// ROUTES
routingController.addRoute('waiting', gameWaitingPageController.launch);
routingController.addRoute('fight', gameFightPageController.launch);
