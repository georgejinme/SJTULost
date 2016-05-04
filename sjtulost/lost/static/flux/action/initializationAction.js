/**
 * Created by gougoumemeda on 16/4/25.
 */

var AppDispatcher = require('../dispatcher/dispatcher');

var FindingAction = {
    fetchData: function() {
        $.get('/getfindings/', function(data) {
            AppDispatcher.dispatch({
                actionType: 'FINDING_INITIALIZATION',
                findingArray: data
            });
        });
    },

    fetchDataWithFilter: function(item, place) {
        $.post('/getfindingswithfilter/',{
            'item': item,
            'place': place
        },function(data) {
            AppDispatcher.dispatch({
                actionType: 'FINDING_UPDATE',
                findingArray: data
            });
        });
    }
};

var FoundAction = {
    fetchData: function() {
        $.get('/getfounds/', function(data) {
            AppDispatcher.dispatch({
                actionType: 'FOUND_INITIALIZATION',
                foundArray: data
            })
        })
    },
    fetchDataWithFilter: function(item, place) {
        $.post('/getfoundswithfilter/',{
            'item': item,
            'place': place
        },function(data) {
            AppDispatcher.dispatch({
                actionType: 'FOUND_UPDATE',
                foundArray: data
            });
        });
    }
};



var ItemTypeAction = {
    fetchData: function() {
        $.get('/getitems/', function(data) {
            AppDispatcher.dispatch({
                actionType: 'ITEM_TYPE_INITIALIZATION',
                itemTypes: data
            })
        });
    },
    select: function(id) {
        AppDispatcher.dispatch({
            actionType: 'ITEM_TYPE_SELECT',
            id: id
        })
    }
};

var PlaceAction = {
    fetchData: function() {
        $.get('/getplaces/', function(data){
            AppDispatcher.dispatch({
                actionType: 'PLACE_INITIALIZATION',
                places: data
            })
        });
    },
    select: function(id) {
        AppDispatcher.dispatch({
            actionType: 'PLACE_SELECT',
            id: id
        })
    }
};

var RankAction = {
    fetchData: function() {
        $.get('/getrank/', function(data) {
            AppDispatcher.dispatch({
                actionType: 'RANK_INITIALIZATION',
                ranks: data
            })
        })
    }
};

module.exports = {
    FindingAction: FindingAction,
    FoundAction: FoundAction,
    ItemTypeAction: ItemTypeAction,
    PlaceAction: PlaceAction,
    RankAction: RankAction
};