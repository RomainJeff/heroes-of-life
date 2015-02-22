var gameHomePageController = {};


gameHomePageController.launch = function () {
    $('#game-content').on('click', '#quit-experience', fullScreenController.exit);
    $('#game-content').on('click', '#play-online', gameHomePageController.playOnline);
    $('#game-content').on('click', '#display-rules', gameHomePageController.displayRules);
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


gameHomePageController.displayRules = function () {
    $(this).addClass('active');
    $('.rules').addClass('active');
};