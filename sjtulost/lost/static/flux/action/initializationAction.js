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

module.exports = InitFindingAction;