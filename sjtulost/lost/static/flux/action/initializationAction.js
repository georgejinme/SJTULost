/**
 * Created by gougoumemeda on 16/4/25.
 */

var AppDispatcher = require('../dispatcher/dispatcher');

var InitFindingAction = {
    fetchData: function() {
        AppDispatcher.dispatch({
            actionType: 'FINDING_INITIALIZATION',
            findingArray: []
        });
    }
};

module.exports = InitFindingAction;