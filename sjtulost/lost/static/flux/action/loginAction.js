/**
 * Created by gougoumemeda on 16/4/22.
 */
var AppDispatcher = require('../dispatcher/dispatcher');

var JaccountLoginActions = {
    login: function (text) {
        AppDispatcher.dispatch({
            actionType: 'JACCOUNT_LOGIN',
            name: "JIN JIAJUN"
        });
    }
};

module.exports = JaccountLoginActions;