var gameHomePageController = {};


gameHomePageController.launch = function () {
    $('#game-content').on('click', '#quit-experience', fullScreenController.exit);
    $('#game-content').on('click', '#play-online', gameHomePageController.playOnline);
};


gameHomePageController.playOnline = function () {
    loadingController.display();
    pageController
      .setParams({heroes: heroesModel})
      .display('characters');

    setTimeout(function () {
        loadingController.hide();
    }, 2000);
};