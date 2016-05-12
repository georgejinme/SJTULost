var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

var UserInfoStore = require('../store/userInfoStore');
var FindingStore = require('../store/findingStore');
var FoundStore = require('../store/foundStore');
var ItemStore = require('../store/itemStore');
var PlaceStore = require('../store/placeStore');
var RankStore = require('../store/rankStore');

AppDispatcher.register(function (action) {
    switch(action.actionType) {
        case 'USER_INFO_UPDATE':
            UserInfoStore.setUpdateResult(action.result);
            UserInfoStore.emitUpdateResult();
            break;

        case 'USER_INFO_INITIALIZATION':
            UserInfoStore.setUserInfo(action.userInfo);
            UserInfoStore.emitChange();
            break;

        case 'USER_FINDING_DONE':
            FindingStore.setUpdateResult(action.result);
            FindingStore.emitUpdateResult();
            break;

        case 'USER_FINDING_INITIALIZATION':
        case 'FINDING_INITIALIZATION':
        case 'FINDING_UPDATE':
        case 'FINDING_VIEWING':
            FindingStore.setFindings(action.findingArray);
            FindingStore.emitChange();
            break;

        case 'USER_FOUND_INITIALIZATION':
        case 'FOUND_INITIALIZATION':
        case 'FOUND_UPDATE':
        case 'FOUND_VIEWING':
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

        case 'ITEM_TYPE_SELECT':
            ItemStore.selectItem(action.id);
            ItemStore.emitSelect();
            break;

        case 'PLACE_SELECT':
            PlaceStore.selectPlace(action.id);
            PlaceStore.emitSelect();
            break;

        case 'RANK_INITIALIZATION':
            RankStore.setRanks(action.ranks);
            RankStore.emitChange();
            break;

        default:
        // no op
    }
});

module.exports = AppDispatcher;