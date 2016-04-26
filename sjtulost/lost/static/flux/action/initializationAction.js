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
        $.get('/getitems/', function(data) {
            AppDispatcher.dispatch({
                actionType: 'ITEM_TYPE_INITIALIZATION',
                itemTypes: data
            })
        });
    }
};

var InitPlaceAction = {
    fetchData: function() {
        $.get('/getplaces/', function(data){
            AppDispatcher.dispatch({
                actionType: 'PLACE_INITIALIZATION',
                places: data
            })
        });
    }
};

module.exports = {
    InitFindingAction: InitFindingAction,
    InitItemTypeAction: InitItemTypeAction,
    InitPlaceAction: InitPlaceAction
};