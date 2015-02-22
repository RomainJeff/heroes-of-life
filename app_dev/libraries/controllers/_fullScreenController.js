var fullScreenController = {
    state: false
};


/**
 * Retourne l'etat du fullScreen
 * @return boolean
 */
fullScreenController.is = function () {
    return this.state;
};


/**
 * Definie l'etat du fullScreen
 * @param boolean state
 */
fullScreenController.set = function (state) {
    this.state = state;
};


/**
 * Entre en mode fullscreen sur l'element indique
 * @param string elementID
 */
fullScreenController.enter = function (elementID) {
    element = document.getElementById(elementID);

    if      (element.requestFullscreen)        element.requestFullscreen();
    else if (element.mozRequestFullScreen)     element.mozRequestFullScreen();
    else if (element.webkitRequestFullscreen)  element.webkitRequestFullscreen();
    else if (element.msRequestFullscreen)      element.msRequestFullscreen();
};


/**
 * Sort du mode fullscreen
 */
fullScreenController.exit = function () {
    if      (document.exitFullscreen)       document.exitFullscreen();
    else if (document.mozCancelFullScreen)  document.mozCancelFullScreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
};


/**
 * Ecoute les changements de mode fullscreen
 * @param function callback
 */
fullScreenController.listen = function (userCallback) {
    var callback = function () {
        fullScreenController.set(!fullScreenController.is());

        userCallback();
    };

    document.addEventListener("fullscreenchange",       callback);
    document.addEventListener("webkitfullscreenchange", callback);
    document.addEventListener("mozfullscreenchange",    callback);
    document.addEventListener("msfullscreenchange",     callback);
};

