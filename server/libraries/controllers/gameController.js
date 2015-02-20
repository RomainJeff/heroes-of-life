module.exports = function () {

    var game = function () {
        this.playing = false;
    };

    game.prototype.isPlaying = function () {
        return this.playing;
    };

    return game;
};