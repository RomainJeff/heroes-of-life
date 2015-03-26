var spectatorEvent = {};


/**
 * Definie le spectateur
 * @param object socket
 * @param string character
 *
 */
spectatorEvent.login =  function (socket) {
    if (!global.models.sessions.hasSpectator()) {
        console.log('Nouveau spectateur: '+ socket.id);
        global.models.sessions.addSpectator(socket.id);
    }
};



module.exports = spectatorEvent;
