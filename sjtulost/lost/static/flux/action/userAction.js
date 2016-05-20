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
                result: rdata['code']
            })
        })
    },

    fetchUserFindings: function(position) {
        $.post('/getuserfindings/', {
            'position': position
        },function(data) {
            AppDispatcher.dispatch({
                actionType: 'USER_FINDING_INITIALIZATION',
                findingArray: data['findings'],
                amount: data['amount']
            })
        })
    },

    fetchUserFounds: function (position) {
        $.post('/getuserfounds/',{
            'position': position
        }, function(data) {
            AppDispatcher.dispatch({
                actionType: 'USER_FOUND_INITIALIZATION',
                foundArray: data['founds'],
                amount: data['amount']
            })
        })
    },

    userFindingsDone: function(id) {
        $.post('/userfindingsdone/', {
            id: id
        }, function(data){
            AppDispatcher.dispatch({
                actionType: 'USER_FINDING_DONE',
                result: data['code']
            })
        })
    },

    userFoundsDone: function(id) {
        $.post('/userfoundsdone/', {
            id: id
        }, function(data) {
            AppDispatcher.dispatch({
                actionType: 'USER_FOUND_DONE',
                result: data['code']
            })
        })
    }
};

module.exports = UserActions;