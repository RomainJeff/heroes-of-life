module.exports = {
    sessions: {},
    spectator: {},
    

    add: function (id, socket) {
        this.sessions[id] = socket;
    },

    delete: function (id) {
        delete this.sessions[id];
    },

    get: function (id) {
        return this.sessions[id];
    },


    addSpectator: function (id) {
        this.spectator[id] = id;
    },

    hasSpectator: function () {
        return (this.spectator.length > 0) ? true : false;
    },

    isSpectator: function (id) {
        return (this.spectator[id]) ? true : false;
    },

    deleteSpectator: function (id) {
        delete this.spectator[id];
    },

    getSpectators: function (callback) {
        callback(this.spectator);
    }
};
