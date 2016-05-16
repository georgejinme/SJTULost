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
    },

    fetchDataWithId: function(id) {
        $.post('/getfindingswithid/', {
            'id': id
        }, function(data) {
            AppDispatcher.dispatch({
                actionType: 'FINDING_VIEWING',
                findingArray: data
            })
        })
    },

    uploadImageInit: function() {
        $('#findingFileupload').fileupload({
            url: '/publishfindinguploadimage/',
            dataType: 'json',
            done: function (e, data) {
                AppDispatcher.dispatch({
                    actionType: 'PUBLISH_FINDING_UPLOAD_IMAGE',
                    img: data['result']['url'],
                    status: data['result']['code']
                });
            },
            send: function(e, data) {
                AppDispatcher.dispatch({
                    actionType: 'PUBLISH_FINDING_UPLOAD_IMAGE',
                    img: '',
                    status: 2
                });
            }
        });
    },

    createFinding: function(finding) {
        $.post('/createfinding/', {
            'description': finding['description'],
            'img': finding['img'],
            'item_type_ids': finding['item_type_ids'],
            'time': finding['time'],
            'place_ids': finding['place_ids'],
            'place_detail': finding['place_detail'],
            'detail': finding['detail'],
            'pay': finding['pay']
        }, function(res) {
            AppDispatcher.dispatch({
                actionType: 'PUBLISH_FINDING_CREATE',
                result: res['code']
            })
        })
    },

    updateFinding: function(finding) {
        $.post('/updatefinding/', {
            'id': finding['id'],
            'description': finding['description'],
            'img': finding['img'],
            'item_type_ids': finding['item_type_ids'],
            'time': finding['time'],
            'place_ids': finding['place_ids'],
            'place_detail': finding['place_detail'],
            'detail': finding['detail'],
            'pay': finding['pay']
        }, function(res) {
            AppDispatcher.dispatch({
                actionType: 'PUBLISH_FINDING_UPDATE',
                result: res['code']
            })
        })
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
    },

    fetchDataWithId: function(id) {
        $.post('/getfoundswithid/', {
            'id': id
        }, function(data) {
            AppDispatcher.dispatch({
                actionType: 'FOUND_VIEWING',
                foundArray: data
            })
        })
    },

    uploadImageInit: function() {
        $('#foundFileupload').fileupload({
            url: '/publishfounduploadimage/',
            dataType: 'json',
            done: function (e, data) {
                AppDispatcher.dispatch({
                    actionType: 'PUBLISH_FOUND_UPLOAD_IMAGE',
                    img: data['result']['url'],
                    status: data['result']['code']
                });
            },
            send: function(e, data) {
                AppDispatcher.dispatch({
                    actionType: 'PUBLISH_FOUND_UPLOAD_IMAGE',
                    img: '',
                    status: 2
                });
            }
        });
    },

    createFound: function(found) {
        $.post('/createfound/', {
            'description': found['description'],
            'img': found['img'],
            'item_type_ids': found['item_type_ids'],
            'time': found['time'],
            'place_id': found['place_id'],
            'place_detail': found['place_detail'],
            'detail': found['detail']
        }, function(res) {
            AppDispatcher.dispatch({
                actionType: 'PUBLISH_FOUND_CREATE',
                result: res['code']
            })
        })
    },

    updateFound: function(found) {
        $.post('/updatefound/', {
            'id': found['id'],
            'description': found['description'],
            'img': found['img'],
            'item_type_ids': found['item_type_ids'],
            'time': found['time'],
            'place_id': found['place_id'],
            'place_detail': found['place_detail'],
            'detail': found['detail']
        }, function(res) {
            AppDispatcher.dispatch({
                actionType: 'PUBLISH_FOUND_UPDATE',
                result: res['code']
            })
        })
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
    select: function(id, mode='multi') {
        AppDispatcher.dispatch({
            actionType: 'ITEM_TYPE_SELECT',
            id: id,
            mode: mode
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
    select: function(id, mode='multi') {
        AppDispatcher.dispatch({
            actionType: 'PLACE_SELECT',
            id: id,
            mode: mode
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