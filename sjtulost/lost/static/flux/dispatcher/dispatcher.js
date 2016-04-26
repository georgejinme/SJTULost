var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

var UserInfoStore = require('../store/userInfoStore');
var FindingStore = require('../store/findingStore');
var FoundStore = require('../store/foundStore');
var ItemStore = require('../store/itemStore');
var PlaceStore = require('../store/placeStore');

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

        case 'ITEM_TYPE_INITIALIZATION':
            ItemStore.setItems(action.itemTypes);
            ItemStore.emitChange();
            break;

        case 'PLACE_INITIALIZATION':
            PlaceStore.setPlaces(action.places);
            PlaceStore.emitChange();
            break;

        default:
        // no op
    }
});

module.exports = AppDispatcher;