var gameFightPageController = {
    grille: null
};


// Reset l'objet
gameFightPageController.reset = function () {
    this.grille = null;
};


gameFightPageController.setGrille = function (grille) {
    gameFightPageController.grille = new grilleController();
    gameFightPageController.grille.grille = grille;
    gameFightPageController.grille.taille = [grille.length, grille[0].length];

    console.log(grille);
};


// Fonction executee au lancement de la page
gameFightPageController.launch = function () {
    gameFightPageController.grille.draw('grille');
};
