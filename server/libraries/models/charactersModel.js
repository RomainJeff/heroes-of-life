module.exports = function () {

    /**
     * Constructeur
     */
    var characterModel = function () {
        this.characters = [];
    };


    /**
     * Ajoute un characters
     * @param id id
     * @param string name
     */
    characterModel.prototype.add = function(id, name) {
        this.characters[id] = name;
    };


    /**
     * Supprime un personnage pris
     * @param int id
     */
    characterModel.prototype.delete = function(id) {
        delete this.characters[id];
    };


    /**
     * Recupere les personnages pris
     */
    characterModel.prototype.get = function() {
        return this.characters;
    };


    /**
     * Verifie si un personnage est pris
     * @param int id
     */
    characterModel.prototype.isTaken = function (name) {
        for (character in this.characters) {
            if (name == this.characters[character]) return true;
        }

        return false;
    };


    // On exporte la classe
    return characterModel;
};