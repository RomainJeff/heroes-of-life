var socketController = function (url) {
    this.connection = io(url);
};


socketController.prototype.on = function (eventName, callback)
{
    this.connection.on(eventName, callback);
};


socketController.prototype.listen = function (events) {
    for (eventName in events) {
        this.on(eventName, events[eventName]);
    }
};


socketController.prototype.send = function (eventName, params)
{
    if (!params) var params = null;
    
    this.connection.emit(eventName, params);
};