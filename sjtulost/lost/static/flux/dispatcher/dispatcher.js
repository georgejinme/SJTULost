var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

var UserInfoStore = require('../store/userInfoStore');
var FindingStore = require('../store/findingStore');
var FoundStore = require('../store/foundStore');

AppDispatcher.register(function (action) {
    switch(action.actionType) {
        case 'JACCOUNT_LOGIN':
            UserInfoStore.setUserName(action.name);
            UserInfoStore.emitChange();
            break;

        case 'FINDING_INITIALIZATION':
            FindingStore.setFindings(action.findingArray);
            FindingStore.emitChange();
            break;

        case 'FOUND_INITIALIZATION':
            FoundStore.setFounds(action.foundArray);
            FoundStore.emitChange();
            break;

        default:
        // no op
    }
});

module.exports = AppDispatcher;