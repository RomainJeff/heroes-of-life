var gameFightPageController = {
    grille: null,
    users: null
};


// Reset l'objet
gameFightPageController.reset = function () {
    this.grille = null;
};


gameFightPageController.setUsers = function (users) {
    gameFightPageController.users = users;
};


gameFightPageController.setGrille = function (grille) {
    gameFightPageController.grille = new grilleController();
    gameFightPageController.grille.grille = grille;
    gameFightPageController.grille.taille = [grille.length, grille[0].length];
};


// Fonction executee au lancement de la page
gameFightPageController.launch = function () {
    gameFightPageController.grille.draw('grille', gameFightPageController.users);
};


/************/
/** EVENTS **/
/************/

gameFightPageController.eventRefresh = function (grille) {
    gameFightPageController.grille.grille = grille;
    gameFightPageController.grille.draw('grille', gameFightPageController.users);
};


gameFightPageController.eventEnd = function (winner) {
    if (winner > -1) {
        var winnerName = gameFightPageController.grille.selectUser(this.users, winner).character;
        alert(winnerName +" win the game !");
    } else {
        alert('Egalite');
    }

    socketInterface.send('disconnect');
    indexController.reset();
    pageController.display('home');
};
