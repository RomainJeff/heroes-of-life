var indexController = {};

indexController.home = function () {
    $('#start-experience').on('click', this.startExperience);
};

indexController.startExperience = function () {
    pageController
      .params({ heroes: heroesModel })
      .display('characters');
};