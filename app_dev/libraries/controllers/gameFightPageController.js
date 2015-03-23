var gameFightPageController = {
    grille: null,
    users: null,
    counter: 30,
    counterInterval: null,
    cells: 0
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


gameFightPageController.requestPause = function () {
    socketInterface.send('pause:request');
};


gameFightPageController.gridSelect = function () {
    var isActive        = $(this).attr('data-active');
    var lineCoord       = $(this).parent().attr('id').replace('line-', '');
    var rowCoord        = $(this).attr('id').replace('row-', '');
    var grille          = gameFightPageController.grille.get();
    var userActive      = gameFightPageController.users[0].camps + 1;
    var userCharacter   = gameFightPageController.users[0].character;

    // Si la cellule est active et appartient a l'user
    // alors il peut la supprimer
    // Sinon Si la cellule est morte et dans les limite de la grille
    // alors il peut la creer
    if (isActive == "true" && grille[lineCoord][rowCoord] == userActive) {
        $(this).attr('data-active', false);
        $(this).attr('data-character', null);
        gameFightPageController.cells++;
        gameFightPageController.grille.setRow(lineCoord, rowCoord, 0);
    } else if (
        (gameFightPageController.cells > 0) &&
        (grille[lineCoord][rowCoord] == 0) &&
        (lineCoord > 0 && rowCoord > 0) &&
        (lineCoord < (gameFightPageController.grille.taille[0] - 1) && rowCoord  < (gameFightPageController.grille.taille[1] - 1))
    ) {
        $(this).attr('data-active', true);
        $(this).attr('data-character', userCharacter);
        gameFightPageController.cells--;
        gameFightPageController.grille.setRow(lineCoord, rowCoord, userActive);
    }
};


// Fonction executee au lancement de la page
gameFightPageController.launch = function () {
    gameFightPageController.grille.draw('grille', gameFightPageController.users);
    $('.power').on('click', gameFightPageController.requestPause);
};



/************/
/** EVENTS **/
/************/

gameFightPageController.eventRefresh = function (grille) {
    gameFightPageController.grille.grille = grille;
    gameFightPageController.grille.draw('grille', gameFightPageController.users);

    if ($('.counter[data-user=1]').hasClass('active')) {
        clearInterval(gameFightPageController.counterInterval);
        $('.counter[data-user=1]').removeClass('active');
    }
};


gameFightPageController.eventPauseResponse = function (response) {
    $('[data-user=0] .pauses').html(response.pauses);

    if (response.pauses <= 0) {
        $('[data-user=0] + .power').remove();
    }

    if (response.state === false) {
        return false;
    }

    gameFightPageController.counter = 20;
    $('[data-user=0] + .power').hide();
    $('.counter[data-user=0]').addClass('active').children('span').html(gameFightPageController.counter);
    $('.grille').removeClass('deactived');

    // On ecoute les evenements de la grille
    $('.grille .line .row').on('click', gameFightPageController.gridSelect);

    // Compteur
    gameFightPageController.counterInterval = setInterval(function () {
        $('.counter[data-user=0] span').html(gameFightPageController.counter);

        if (gameFightPageController.counter == 0) {
            $('.counter[data-user=0]').removeClass('active');
            $('[data-user=0] + .power').show();
            $('.grille').addClass('deactived');
            $('.grille .line .row').unbind('click');

            socketInterface.send('pause:validate', gameFightPageController.grille.get());
            clearInterval(gameFightPageController.counterInterval);
        }

        gameFightPageController.counter--;
    }, 1000);
};


gameFightPageController.eventGamePaused = function (pauses) {
    gameFightPageController.counter = 20;
    $('[data-user=1] .pauses').html(pauses);
    $('.counter[data-user=1]').addClass('active').html(gameFightPageController.counter);

    // Compteur
    gameFightPageController.counterInterval = setInterval(function () {
        $('.counter[data-user=1]').html(gameFightPageController.counter);

        if (gameFightPageController.counter == 0) {
            $('.counter[data-user=1]').removeClass('active');
            clearInterval(gameFightPageController.counterInterval);
        }

        gameFightPageController.counter--;
    }, 1000);
};


gameFightPageController.eventEnd = function (winner) {
    if (winner > -1) {
        var winnerName = gameFightPageController.grille.selectUser(gameFightPageController.users, winner).character;
        alert(winnerName +" win the game !");
    } else {
        alert('Egalite');
    }

    socketInterface.send('disconnect');
    indexController.reset();
    pageController.display('home');
};
