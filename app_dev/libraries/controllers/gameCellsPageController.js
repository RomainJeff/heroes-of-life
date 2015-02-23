var gameCellsPageController = {
    cells: 25,
    grille: null,
    counter : null,
    timeLeft: 240
};


// Fonction executee au lancement de la page
gameCellsPageController.launch = function () {
    var character = $('#character-saved').html();
    gameCellsPageController.grille = new grilleController();

    gameCellsPageController.grille.generate([15, 8])
            .setCharacter(character)
            .draw('grille-cells');

    gameCellsPageController.refreshCells();
    gameCellsPageController.counter = setInterval(gameCellsPageController.refreshCounter, 1000);

    $('#game-content').on('click', '#grille-cells .line .row', gameCellsPageController.cellsSelect);
    $('#game-content').on('click', '#start-game', gameCellsPageController.startGame);
};


// Rafraichie le decompte
gameCellsPageController.refreshCounter = function () {
    gameCellsPageController.timeLeft--;

    var timeleft = gameCellsPageController.timeLeft;
    var minutes = Math.floor(timeleft / 60);
    var seconds = timeleft - minutes * 60;

    if (timeleft <= 0) return gameCellsPageController.callbackCounter();

    $('#time-counter').html(minutes +":"+ seconds);
};


// Quand le compteur est over
gameCellsPageController.callbackCounter = function () {
    clearInterval(this.counter);

    this.startGame();
};


// Quand l'utilisateur clique sur "commencer le jeu"
gameCellsPageController.startGame = function () {
    pageController
        .setParams({title: 'Waiting for your mate'})
        .display('waiting');
};


// Quand l'utilisateur selectionne une cellule
gameCellsPageController.cellsSelect = function () {
    var isActive    = $(this).attr('data-active');
    var lineCoord   = $(this).parent().attr('id').replace('line-', '');
    var rowCoord    = $(this).attr('id').replace('row-', '');

    if (isActive == "true") {
        $(this).attr('data-active', false);
        gameCellsPageController.cells++;
    } else if (
        gameCellsPageController.hasRessources() &&
        (lineCoord > 0 && rowCoord > 0) &&
        (lineCoord < (gameCellsPageController.grille.taille[1] - 1) && rowCoord  < (gameCellsPageController.grille.taille[0] - 1))
    ) {
        $(this).attr('data-active', true);
        gameCellsPageController.cells--;
    }

    gameCellsPageController.refreshCells();
};


// Verifie que l'utilisateur a encore des ressources
gameCellsPageController.hasRessources = function () {
    return (this.cells > 0) ? true : false;
};


// Rafraichie le nombre de cellules restantes
gameCellsPageController.refreshCells = function () {
    $('#cells-counter i').html(this.cells);
};