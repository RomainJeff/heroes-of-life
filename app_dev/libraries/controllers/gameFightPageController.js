var gameFightPageController = {
    grille: null,
    users: null,
    counter: 30,
    counterInterval: null
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

    // Compteur
    gameFightPageController.counterInterval = setInterval(function () {
        $('.counter[data-user=0] span').html(gameFightPageController.counter);

        if (gameFightPageController.counter == 0) {
            $('.counter[data-user=0]').removeClass('active');
            $('[data-user=0] + .power').show();

            socketInterface.send('pause:validate', []);
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
