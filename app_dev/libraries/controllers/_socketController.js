/**
 * Constructeur
 * @param string url
 */
var socketController = function (url) {
    this.connection = io(url);
};


/**
 * Ecoute un evenement
 * @param string eventName
 * @param function callback
 */
socketController.prototype.on = function (eventName, callback)
{
    this.connection.on(eventName, callback);
};


/**
 * Declare plusieurs evenements a ecouter
 * @param object events
 */
socketController.prototype.listen = function (events) {
    for (eventName in events) {
        this.on(eventName, events[eventName]);
    }
};


/**
 * Envoie un evenement au serveur
 * @param string eventName
 * @param object params
 */
socketController.prototype.send = function (eventName, params)
{
    if (!params) var params = null;
    
    this.connection.emit(eventName, params);
};