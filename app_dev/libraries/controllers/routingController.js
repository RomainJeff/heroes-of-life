var routingController = {
    routes: []
};


/**
 * Ajoute une route
 * @param string routeName Le nom de la route
 * @param function callback
 */
routingController.addRoute = function (routeName, callback) {
    this.routes[routeName] = callback;
};


/**
 * Appelle une route
 * @param string routeName Le nom du la route
 * @param object params Les parametres a passer
 */
routingController.call = function (routeName, params) {
    if (!params) var params = [];

    return this.routes[routeName](params);
};