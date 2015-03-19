var notificationController = {};


notificationController.display = function (message, buttonMessage) {
    pageController.setParams({
        message: message,
        button: buttonMessage
    });

    pageController.load('notification', function (content) {
        $('#notification-content').html(content);
        pageController.cleanParams();
    });

    $('#notification-content').on('click', '.notification-button', function () {
        notificationController.hide();
    });
};

notificationController.hide = function () {
    $('#notification-content .notification-container').removeClass('active');

    setTimeout(function () {
        notificationController.reset();
    }, 300);
};


notificationController.reset = function () {
    $('#notification-content').html('');
};
