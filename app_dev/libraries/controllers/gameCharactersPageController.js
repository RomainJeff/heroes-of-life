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

gameCharactersPageController.eventIsValid = function (response) {
    loadingController.hide();

    if (response.state != false) {
        pageController
          .setParams({ character: response.character, position: response.position })
          .display('cells');
    } else {
        notificationController.display('This heroe is already in mission');
    }
};
