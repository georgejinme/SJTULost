/**
 * Created by gougoumemeda on 16/4/22.
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var UserInfoStore = assign({}, EventEmitter.prototype, {

    /*
        {
            name:
            phone:
            student_number:
        }
     */

    userInfo: {},
    // this property indicated the result of updating of user information
    updateResult: 0,

    getUserInfo: function () {
        return this.userInfo
    },

    getUpdateResult: function() {
        return this.updateResult
    },

    setUserPhone: function(phone) {
        this.userInfo['phone'] = phone
    },

    setUserStudentNumber: function(sn) {
        this.userInfo['student_number'] = sn
    },

    setUserInfo: function(json) {
        this.userInfo = json
    },

    setUpdateResult: function(re){
        this.updateResult = re
    },

    emitChange: function () {
        this.emit('change');
    },

    emitUpdateResult: function() {
        this.emit('update')
    },

    addUpdateListener: function(callback) {
        this.on('update', callback);
    },

    removeUpdateListener: function(callback) {
        this.removeListener('update', callback);
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

module.exports = UserInfoStore;