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

        case 'USER_FOUND_DONE':
            FoundStore.setUpdateResult(action.result);
            FoundStore.emitUpdateResult();
            break;

        case 'USER_FINDING_INITIALIZATION':
        case 'FINDING_INITIALIZATION':
        case 'FINDING_UPDATE':
        case 'FINDING_VIEWING':
            FindingStore.setFindings(action.findingArray);
            FindingStore.setTotalAmount(action.amount);
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
            if (action.mode == 'single') ItemStore.singleSelectItem(action.id);
            else if (action.mode =='multi') ItemStore.multiSelectItem(action.id);
            ItemStore.emitSelect();
            break;

        case 'PLACE_SELECT':
            if (action.mode == 'single') PlaceStore.singleSelectPlace(action.id);
            else if (action.mode =='multi') PlaceStore.multiSelectPlace(action.id);
            PlaceStore.emitSelect();
            break;

        case 'RANK_INITIALIZATION':
            RankStore.setRanks(action.ranks);
            RankStore.emitChange();
            break;

        case 'PUBLISH_FINDING_UPLOAD_IMAGE':
            FindingStore.setImage(action.img);
            FindingStore.setUploadImageStatus(action.status);
            FindingStore.emitChange();
            FindingStore.emitUploadImage();
            break;

        case 'PUBLISH_FINDING_CREATE':
            FindingStore.setUpdateResult(action.result);
            FindingStore.emitUpdateResult();
            break;

        case 'PUBLISH_FINDING_UPDATE':
            FindingStore.setUpdateResult(action.result);
            FindingStore.emitUpdateResult();
            break;

        case 'PUBLISH_FOUND_UPLOAD_IMAGE':
            FoundStore.setImage(action.img);
            FoundStore.setUploadImageStatus(action.status);
            FoundStore.emitChange();
            FoundStore.emitUploadImage();
            break;

        case 'PUBLISH_FOUND_CREATE':
            FoundStore.setUpdateResult(action.result);
            FoundStore.emitUpdateResult();
            break;

        case 'PUBLISH_FOUND_UPDATE':
            FoundStore.setUpdateResult(action.result);
            FoundStore.emitUpdateResult();
            break;

        default:
        // no op
    }
});

module.exports = AppDispatcher;