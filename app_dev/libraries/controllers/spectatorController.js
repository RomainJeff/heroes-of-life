var spectatorController = {};


spectatorController.home = function () {
    $('#start-experience').on('click', spectatorController.startWatching);

    fullScreenController.listen(indexController.listenFullscreenChanges);
};


spectatorController.startWatching = function () {
    pageController
        .setParams({message: "Waiting the match to begin"})
        .display('waiting');
    fullScreenController.enter('game-interface');

    // On previent le serveur
    socketInterface.send('spectator:login');
};
