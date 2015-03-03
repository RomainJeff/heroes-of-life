var consoleController = {
    debug: function (object) {
        console.objectCollapsed(object);
    },
    
    error: function (message) {
        console.log("%c ––>"+ message +" ", 'background: red; color: white');
    },

    success: function (message) {
        console.log("%c ––> "+ message +" ", 'background: #02b203; color: white');
    }
};
