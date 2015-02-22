$(function() {

    // HOMEPAGE
    indexController.home();
    
    // ROUTES
    routingController.addRoute('home', gameHomePageController.launch);
    routingController.addRoute('characters', gameCharactersPageController.launch);

});