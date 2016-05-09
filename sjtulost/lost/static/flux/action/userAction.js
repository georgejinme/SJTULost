/**
 * Created by gougoumemeda on 16/4/22.
 */
var AppDispatcher = require('../dispatcher/dispatcher');

var UserActions = {
    fetchData: function() {
        $.get('/getuserinfo/', function(data){
            AppDispatcher.dispatch({
                actionType: 'USER_INFO_INITIALIZATION',
                userInfo: data
            })
        })
    }
};

module.exports = UserActions;