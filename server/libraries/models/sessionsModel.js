module.exports = {
    sessions: {},
    spectator: null,

    add: function (id, socket) {
        this.sessions[id] = socket;
    },

    addSpectator: function (id) {
        this.spectator = id;
    },

    hasSpectator: function () {
        return (this.spectator != null) ? true : false;
    },

    isSpectator: function (id) {
        return (this.spectator === id) ? true : false;
    },

    deleteSpectator: function () {
        this.spectator = null;
    },

    delete: function (id) {
        delete this.sessions[id];
    },

    get: function (id) {
        return this.sessions[id];
    }
};
