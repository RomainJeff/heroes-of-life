    module.exports = function () {

    /**
     * Constructeur
     */
    var userModel = function () {
        this.users = [];
        this.waiting = [];
    };


    /**
     * Ajoute un utilisateur
     * @param int id
     */
    userModel.prototype.addPlaying = function(id) {
        this.users[id] = {};
    };


    /**
     * Ajoute un utilisateur en attente
     * @param int id
     */
    userModel.prototype.addWaiting = function(id) {
        this.waiting.push(id);
    };


    /**
     * Modifie les parametres d'un utilisateur
     * @param object params
     */
    userModel.prototype.set = function(id, params) {
        this.users[id] = params;
    };


    /**
     * Definie l'etat Ready du joueur donne
     * @param string id
     * @param bool ready
     */
    userModel.prototype.setReady = function (id, ready) {
        this.users[id].ready = ready;
    };


    /**
     * Verifie si un adversaire est pret
     * @param string id
     * @return bool
     */
    userModel.prototype.isReady = function (id) {
        for(user in this.users) {
            if (this.users[user].ready && user != id) {
                return true;
            }
        }
    };


    /**
     * Retourne le camp libre (top: 0, bottom: 1)
     * @return boolean
     *
     */
    userModel.prototype.getFreeCamp = function () {
        for (index in this.users) {
            if (this.users[index]) {
                return !this.users[index].index;
            }
        }

        return false;
    };


    /**
     * Definie le camp de l'utilisateur
     * @param string id
     * @param closure callback
     *
     */
    userModel.prototype.setCamp = function (id, callback) {
        var index = this.getFreeCamp();

        this.set(id, {
            index: index,
            ready: false,
            pauses: 2
        });

        callback(index);
    };


    /**
     * Supprime un utilisateur en jeu
     * @param int id
     */
    userModel.prototype.deletePlaying = function(id) {
        delete this.users[id];
    };


    /**
     * Supprime un utilisateur en attente
     * @param int id
     */
    userModel.prototype.deleteWaiting = function(id) {
        delete this.waiting[this.waiting.indexOf(id)];
    };


    /**
     * Verifie qu'un utilisateur existe
     * @param int id
     * @param bool inGame
     */
    userModel.prototype.exists = function (id, inGame) {
        if (inGame) {
            if (!this.users[id]) return false;
        } else {
            if (!this.waiting[this.waiting.indexOf(id)]) return false;
        }

        return true;
    };


    /**
     * Recupere les utilisateurs en jeu
     * @param int id
     */
    userModel.prototype.getPlaying = function (id) {
        if (!id) return this.users;

        return this.users[id];
    };


    /**
     * Recupere le nombre d'utilisateurs en jeu
     */
    userModel.prototype.getCountPlaying = function () {
        var count = 0;

        for (user in this.users) { count++; }

        return count;
    };


    /**
     * Recupere les utilisateurs en attente
     * @param int id
     */
    userModel.prototype.getWaiting = function (id) {
        if (!id) return this.waiting;

        return this.waiting[this.waiting.indexOf(id)];
    }


    /**
     * Recupere les utilisateurs en attente via leur index direct
     * @param int id
     */
    userModel.prototype.getWaitingFromIndex = function (index) {
        return this.waiting[index];
    }


    /**
     * Recupere l'id de l'adversaire
     * @param string id L'id de l'utilisateur courant
     */
    userModel.prototype.getAdversary = function(id) {
        for (user in this.users) {
            if (id != user) {
                return user;
            }
        }

        // Sinon il n'y a pas d'adversaire
        return false;
    };


    /**
     * Exporte les informations sous forme d'objet d'un utilisateur
     * @param string id
     * @return object
     */
    userModel.prototype.export = function (id) {
        return {
            pauses: this.users[id].pauses,
            character: global.models.characters.get()[id],
            camps: this.users[id].index
        };
    };


    /**
     * Retourne si l'utilisateur peut faire une pause
     * @param string id
     *
     */
    userModel.prototype.canPause = function (id) {
        return (this.users[id].pauses > 0) ? true : false;
    };


    /**
     * Recupere le nombre de pauses
     * @param string id
     *
     */
    userModel.prototype.getPauses = function (id) {
        return this.users[id].pauses;
    };


    /**
     * Decremente le nombre de pauses
     * @param string id
     */
     userModel.prototype.deletePause = function (id) {
         this.users[id].pauses -= 1;

         return this.users[id].pauses;
     };


    // On exporte la classe
    return userModel;
};
