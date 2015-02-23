var gameWaitingPageController = {
    interval: null,
    i: 2
};


gameWaitingPageController.launch = function () {
    gameWaitingPageController.interval = setInterval(gameWaitingPageController.alternHeroes, 10000);
};


gameWaitingPageController.alternHeroes = function () {
    var $heroes = $('.character-infos');
    var $heroe = null;

    if (gameWaitingPageController.i > $heroes.length) {
        gameWaitingPageController.i = 1;
    }

    $heroe = $('.character-infos:nth-child('+ gameWaitingPageController.i +')');

    $('.character-infos[data-active="true"]').attr('data-active', false);
    $heroe.attr('data-active', true);

    gameWaitingPageController.i++;
};


gameWaitingPageController.reset = function () {
    clearInterval(this.interval);
};