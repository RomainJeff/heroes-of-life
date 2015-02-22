var gameCellsPageController = {
    cells: 1,
    grille: null
};


gameCellsPageController.launch = function () {
    var character = $('#character-saved').html();
    gameCellsPageController.grille = new grilleController();

    gameCellsPageController.grille.generate([15, 8])
            .setCharacter(character)
            .draw('grille-cells');

    gameCellsPageController.refreshCells();

    $('#game-content').on('click', '#grille-cells .line .row', gameCellsPageController.cellsSelect);
    $('#game-content').on('click', '#start-game', gameCellsPageController.startGame);
};


gameCellsPageController.startGame = function () {
    pageController
        .setParams({title: 'Waiting for your mate'})
        .display('waiting');
};


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
    gameCellsPageController.verifyStartButton();
};


gameCellsPageController.hasRessources = function () {
    return (this.cells > 0) ? true : false;
};


gameCellsPageController.refreshCells = function () {
    $('#cells-counter i').html(this.cells);
};


gameCellsPageController.verifyStartButton = function () {
    if (!this.hasRessources()) {
        $('#start-game').removeClass('blocked');
    } else {
        $('#start-game').addClass('blocked');
    }
};