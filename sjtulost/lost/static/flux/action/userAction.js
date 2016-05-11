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
    },
    updateData: function(data) {
        $.post('/updateuserinfo/', {
            phone: data['phone'],
            student_number: data['student_number']
        }, function(rdata){
            AppDispatcher.dispatch({
                actionType: 'USER_INFO_UPDATE',
                result: rdata['success']
            })
        })
    },

    fetchUserFindings: function() {
        $.get('/getuserfindings/', function(data) {
            AppDispatcher.dispatch({
                actionType: 'USER_FINDING_INITIALIZATION',
                findingArray: data
            })
        })
    }
};

module.exports = UserActions;