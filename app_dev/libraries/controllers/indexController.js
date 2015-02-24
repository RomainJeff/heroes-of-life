var indexController = {};


indexController.home = function () {
    $('#start-experience').on('click', this.startExperience);
    
    fullScreenController.listen(this.listenFullscreenChanges);
};


indexController.startExperience = function () {
    pageController.display('home');
    fullScreenController.enter('game-interface');
};


indexController.listenFullscreenChanges = function () {
    $('#game-interface').toggleClass('active');

    if (!fullScreenController.is()) {
        this.reset();
        socketInterface.send('disconnect');
    }
};


indexController.reset = function () {
    gameCellsPageController.reset();
    gameWaitingPageController.reset();
    loadingController.hide();
};