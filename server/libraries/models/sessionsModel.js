module.exports = {
    sessions: {},

    add: function (id, socket) {
        this.sessions[id] = socket;
    },

    delete: function (id) {
        delete this.sessions[id];
    },

    get: function (id) {
        return this.sessions[id];
    }
};