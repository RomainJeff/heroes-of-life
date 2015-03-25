var gameCellsPageController = {
    cells: 25,
    grille: null,
    counter : null,
    timeLeft: 240
};


// Reset l'objet
gameCellsPageController.reset = function () {
    this.cells = 25;
    this.grille = null;
    this.timeLeft = 240;

    clearInterval(this.counter);
};


// Fonction executee au lancement de la page
gameCellsPageController.launch = function () {
    var character = $('#character-saved').html();
    gameCellsPageController.grille = new grilleController();

    gameCellsPageController.grille.generate([8, 15])
            .setCharacter(character)
            .draw('grille-cells');

    gameCellsPageController.refreshCells();

    $('#game-content').on('click', '#grille-cells .line .row', gameCellsPageController.cellsSelect);
    $('#game-content').on('click', '#start-game', gameCellsPageController.startGame);

    // Event listener tutoriel
    $('#tutorial-content [data-close="true"]').on('click', gameCellsPageController.tutorialClose);
    $('#tutorial-content [data-start="true"]').on('click', gameCellsPageController.tutorialStart);

    // Affichage du tutoriel
    setTimeout(function () {
        $('#tutorial-overlay').addClass('active');
        $('#tutorial-content').addClass('active');
    }, 150);
};


// Rafraichie le decompte
gameCellsPageController.refreshCounter = function () {
    gameCellsPageController.timeLeft--;

    var timeleft = gameCellsPageController.timeLeft;
    var minutes = Math.floor(timeleft / 60);
    var seconds = timeleft - minutes * 60;

    if (timeleft <= 0) return gameCellsPageController.callbackCounter();

    $('#time-counter').html(minutes +" : "+ seconds);
};


// Quand le compteur est over
gameCellsPageController.callbackCounter = function () {
    clearInterval(this.counter);

    this.startGame();
};


// Quand l'utilisateur clique sur "commencer le jeu"
gameCellsPageController.startGame = function () {
    socketInterface.send('user:ready', gameCellsPageController.grille.get());
};


// Quand l'utilisateur selectionne une cellule
gameCellsPageController.cellsSelect = function () {
    var isActive    = $(this).attr('data-active');
    var lineCoord   = $(this).parent().attr('id').replace('line-', '');
    var rowCoord    = $(this).attr('id').replace('row-', '');


    if (isActive == "true") {
        $(this).attr('data-active', false);
        gameCellsPageController.cells++;
        gameCellsPageController.grille.setRow(lineCoord, rowCoord, 0);
    } else if (
        gameCellsPageController.hasRessources() &&
        (lineCoord > 0 && rowCoord > 0) &&
        (lineCoord < (gameCellsPageController.grille.taille[0] - 1) && rowCoord  < (gameCellsPageController.grille.taille[1] - 1))
    ) {
        $(this).attr('data-active', true);
        gameCellsPageController.cells--;
        gameCellsPageController.grille.setRow(lineCoord, rowCoord, 1);
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


// Ferme le tutoriel
gameCellsPageController.tutorialClose = function () {
    $('#tutorial-content').removeClass('active');
    $('#tutorial-overlay').removeClass('active');

    // On lance le decompte
    gameCellsPageController.counter = setInterval(gameCellsPageController.refreshCounter, 1000);
};


// Commence le tutoriel
gameCellsPageController.tutorialStart = function () {
    // On affiche les fleches
    $('#tutorial-content .arrow').addClass('active');

    // On tourne la slide
    gameCellsPageController.tutorialSlide("+");

    // On ecoute l'event clavier
    $(document).on('keyup', gameCellsPageController.tutorialKeyboardListener);
    $('#tutorial-content .arrow').on('click', gameCellsPageController.tutorialArrowListener);
};


// Change de slide
gameCellsPageController.tutorialSlide = function (signe) {
    var currentSlide = $('.slide.active');
    var slide = currentSlide.attr('data-slide');
    var slidesLength = $('.slide').length;

    if (signe == "+") {
        slide++;
    } else {
        slide--;
    }

    // Si il y a pas de slide suivante
    if (slide < 0 || slide >= slidesLength) {
        return false;
    }

    var nextSlide = $('.slide[data-slide="'+ slide +'"]');

    // On verifie si il faut cacher les fleches
    if (slide <= 0) {
        $('.arrow.arrow-left').removeClass('active');
    } else {
        $('.arrow.arrow-left').addClass('active');
    }

    if (slide >= (slidesLength - 1)) {
        $('.arrow.arrow-right').removeClass('active');
    } else {
        $('.arrow.arrow-right').addClass('active');
    }


    // On check le signe pour appliquer la bonne anim
    if (signe == "+") {
        currentSlide.addClass('left').removeClass('active');
        nextSlide.addClass('active').removeClass('right');
    } else {
        currentSlide.addClass('right').removeClass('active');
        nextSlide.addClass('active').removeClass('left');
    }
};


// Change le slide quand on clique sur une des fleches visuelles
gameCellsPageController.tutorialArrowListener = function () {
    if ($(this).hasClass('arrow-right')) {
        gameCellsPageController.tutorialSlide('+');
    } else {
        gameCellsPageController.tutorialSlide('-');
    }
};


// Change le slide quand on clique sur les fleches du clavier
gameCellsPageController.tutorialKeyboardListener = function (e) {
    var keyCode = e.keyCode;

    if (keyCode == 39) {
        gameCellsPageController.tutorialSlide('+');
    } else if (keyCode == 37) {
        gameCellsPageController.tutorialSlide('-');
    }
};



/************/
/** EVENTS **/
/************/

gameCellsPageController.eventCanStart = function (response) {
    if (response.state === false) {
        notificationController.display(response.message, 'Select my cells');

        return false;
    }

    var params = [];

    switch (response.page) {
        case "waiting":
            params = {
                message: "Waiting for the other player"
            };
            break;
        case "fight":
            params = {
                infos: response.infos
            };
            gameFightPageController.setGrille(response.infos.grille);
            gameFightPageController.setUsers(response.infos.users);
            break;
    }

    pageController
        .setParams(params)
        .display(response.page);
};
