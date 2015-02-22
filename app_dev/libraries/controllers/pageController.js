var pageController = {};


/**
 * Charge une vue Handlebars et la compile
 * @param string page Le nom de la page a charger
 * @param function callback Le callback
 */
pageController.load = function (page, callback) {
    var that = this;

    $.get('libraries/views/'+ page +'.hbs', function (content) {
        callback(
            Handlebars.compile(content)(that.params)
        );
    });
};


/**
 * Ajout des parametres a passer a la vue
 * @param object params Les parametres
 * @return object
 */
pageController.setParams = function (params) {
    this.params = params;

    return this;
};


/**
 * Nettoie les parametres
 */
pageController.cleanParams = function () {
    this.params = [];
};


/**
 * Affiche une vue dans le container souhaite
 * @param string page Le nom de la page
 * @param string container Le nom du container
 */
pageController.display = function (page, container) {
    if (!container) var container = 'game-content';

    var that = this;

    this.load(page, function (content) {
        $('#'+ container).html(content);
        routingController.call(page);
        that.cleanParams();
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