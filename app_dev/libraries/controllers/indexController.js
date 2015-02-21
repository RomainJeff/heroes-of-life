var indexController = {};

indexController.home = function () {
    $('#start-experience').on('click', this.startExperience);
};

indexController.startExperience = function () {
    pageController
      .params({
        heroes: [ {
                name: 'Green Lantern',
                id: 'green-lanter',
                char: 'green'
            }, {
                name: 'Batman',
                id: 'batman',
                char: 'batman'
            }, {
                name: 'Flash',
                id: 'flash',
                char: 'flash'
            }, {
                name: 'Superman',
                id: 'superman',
                char: 'superman'
            }
        ]
      })
      .display('characters');
};