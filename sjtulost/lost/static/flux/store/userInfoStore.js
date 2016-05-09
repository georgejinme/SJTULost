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

    getUserInfo: function () {
        return this.userInfo
    },

    setUserInfo: function(json) {
        this.userInfo = json
    },

    emitChange: function () {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

module.exports = UserInfoStore;