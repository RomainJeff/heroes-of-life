module.exports = {
    sessions: {},
    spectator: {},

    add: function (id, socket) {
        this.sessions[id] = socket;
    },

    addSpectator: function (id) {
        this.spectator = id;
    },

    hasSpectator: function () {
        return (this.spectator.length > 0) ? true : false;
    },

    isSpectator: function (id) {
        return (this.spectator.indexOf(id) > -1) ? true : false;
    },

    deleteSpectator: function (id) {
        this.spectator.slice[id];
    },

    delete: function (id) {
        delete this.sessions[id];
    },

    get: function (id) {
        return this.sessions[id];
    }
};
