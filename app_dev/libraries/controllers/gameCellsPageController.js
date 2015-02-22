var gameCellsPageController = {};


gameCellsPageController.launch = function () {
    var character = $('#character-saved').html();
    var grille = new grilleController()
      .generate([8, 15])
      .setCharacter(character)
      .draw('grille-cells');
};