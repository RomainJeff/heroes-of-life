var pageController = {};


/**
 * Charge une vue Handlebars et la compile
 * @param string page Le nom de la page a charger
 * @param function callback Le callback
 */
pageController.load = function (page, callback) {
    $.get('libraries/views/'+ page +'.hbs', function (content) {
        callback(
            Handlebars.compile(content)
        );
    });
};


/**
 * Affiche une vue dans le container souhaite
 * @param string page Le nom de la page
 * @param string container Le nom du container
 */
pageController.display = function (page, container) {
    if (!container) var container = 'game-content';

    this.load(page, function (content) {
        $('#'+ container).html(content);
        routingController.call(page);
    });
};


/**
 * Reset le container
 * @param string container Le nom du container
 */
pageController.reset = function (container) {
    if (!container) var container = 'game-content';

    $('#'+ container).html("");
};


/**
 * Affiche le loader
 */
pageController.displayLoading = function () {
    this.display('loading', 'loading-content');
};


/**
 * Cache le loader
 */
pageController.hideLoading = function () {
    this.reset('loading-content');
};