var gameHomePageController = {};


gameHomePageController.launch = function () {
    $('#game-content').on('click', '#quit-experience', fullScreenController.exit);
    $('#game-content').on('click', '#play-online', gameHomePageController.playOnline);
};


gameHomePageController.playOnline = function () {
    loadingController.display();

    setTimeout(function () {
        loadingController.hide();
    }, 2000);
};