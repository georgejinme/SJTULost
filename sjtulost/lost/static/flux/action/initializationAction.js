/**
 * Created by gougoumemeda on 16/4/25.
 */

var AppDispatcher = require('../dispatcher/dispatcher');

var InitFindingAction = {
    fetchData: function() {
        $.get('/getfindings/', function(data) {
            AppDispatcher.dispatch({
                actionType: 'FINDING_INITIALIZATION',
                findingArray: data
            });
        });
        $.get('/getfounds/', function(data) {
            AppDispatcher.dispatch({
                actionType: 'FOUND_INITIALIZATION',
                foundArray: data
            })
        })
    }
};

var InitItemTypeAction = {
    fetchData: function() {
        AppDispatcher.dispatch({
            actionType: 'ITEM_TYPE_INITIALIZATION',
            itemTypes: []
        })
    }
};

var InitPlaceAction = {
    fetchData: function() {
        AppDispatcher.dispatch({
            actionType: 'PLACE_INITIALIZATION',
            places: []
        })
    }
};

module.exports = {
    InitFindingAction: InitFindingAction,
    InitItemTypeAction: InitItemTypeAction,
    InitPlaceAction: InitPlaceAction
};