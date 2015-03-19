var gameHomePageController = {};


gameHomePageController.launch = function () {
    $('#game-content').on('click', '#quit-experience', fullScreenController.exit);
    $('#game-content').on('click', '#play-online', gameHomePageController.playOnline);
    $('#game-content').on('click', '#display-rules', gameHomePageController.displayRules);
};


gameHomePageController.playOnline = function () {
    loadingController.display();

    socketInterface.send('user:request');
};


gameHomePageController.displayRules = function () {
    $(this).addClass('active');
    $('.rules').addClass('active');
};


gameHomePageController.resetListeners = function () {
    $('#game-content #quit-experience').unbind('click');
    $('#game-content #play-online').unbind('click');
    $('#game-content #display-rules').unbind('click');
};


/************/
/** EVENTS **/
/************/

gameHomePageController.eventCanPlay = function (state) {
    loadingController.hide();

    if (state === true) {
        pageController
            .setParams({heroes: heroesModel})
            .display('characters');
    } else {
        pageController
            .setParams({message: "Waiting for the game to end"})
            .display('waiting');
    }
};


gameHomePageController.eventLogout = function () {
    indexController.reset();
    socketInterface.send('disconnect');

    pageController.display('home');
};
