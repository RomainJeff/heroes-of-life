var gameCharactersPageController = {};


gameCharactersPageController.launch = function () {
    $('#game-content').on('click', '#select-character li', gameCharactersPageController.selectChar);
};


gameCharactersPageController.selectChar = function () {
    var character = $(this).attr('data-char');
    
    loadingController.display();
    socketInterface.send('character:choose', character);
};


gameCharactersPageController.resetListeners = function () {
    $('#game-content').unbind('click');
};


/************/
/** EVENTS **/
/************/

gameCharactersPageController.eventIsValid = function (character) {
    loadingController.hide();

    if (character != false) {
        pageController
          .setParams({ character: character })
          .display('cells');
    } else {
        notificationController.display('This heroe is already in mission');
    }
};