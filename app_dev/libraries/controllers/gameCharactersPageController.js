var gameCharactersPageController = {};


gameCharactersPageController.launch = function () {
    $('#game-content').on('click', '#select-character li', gameCharactersPageController.selectChar);
};


gameCharactersPageController.selectChar = function () {
    var character = $(this).attr('data-char');
    
    pageController
      .setParams({ character: character })
      .display('cells');
};