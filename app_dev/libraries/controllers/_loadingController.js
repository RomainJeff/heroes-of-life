var loadingController = {
    interval: null
};


/**
 * Affiche le loader
 */
loadingController.display = function () {
    pageController.display('loading', 'loading-content');
    $('#loading-content').addClass('active');

    this.start();
};


/**
 * Cache le loader
 */
loadingController.hide = function () {
    $('#loading-content').removeClass('active');
    pageController.reset('loading-content');

    this.stop();
};


/**
 * Lance le loader
 */
loadingController.start = function () {
    this.interval = setInterval(function () {
        var container = $('#loading-content .flash');
        var step = parseInt(container.attr('data-step'));
        step = (step >= 3) ? 0 : (step + 1);

        container.attr('data-step', step);
    }, 50);
};


/**
 * Stop le loader
 */
loadingController.stop = function () {
    clearInterval(this.interval);
};