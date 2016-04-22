var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

var UserInfoStore = require('../store/userInfoStore');

AppDispatcher.register(function (action) {
    switch(action.actionType) {
        case 'JACCOUNT_LOGIN':
            UserInfoStore.setUserName(action.name);
            UserInfoStore.emitChange();
            break;
        default:
        // no op
    }
});

module.exports = AppDispatcher;