var characterEvent = {};


/**
 * Selectionne un personnage
 * @param object socket
 * @param string character
 *
 */
characterEvent.select =  function (socket, character) {
    // Si le personnage n'est pas deja pris
    if (!global.models.characters.isTaken(character)) {
        console.log('Le joueur '+ socket.id +' choisis '+ character);
        
        global.models.characters.add(socket.id, character);
        global.models.users.setCamp(socket.id, function (index) {
            socket.emit('character:isValid', {state: true, character: character, position: index});
        })
    } else {
        socket.emit('character:isValid', {state: false});
    }
};



module.exports = characterEvent;
