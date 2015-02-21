$(function() {

    // HOMEPAGE
    indexController.home();
    
    // ROUTES
    routingController.addRoute('home', gamePagesController.home);
    routingController.addRoute('characters', gamePagesController.characters);

});