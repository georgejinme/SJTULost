/**
 * Created by gougoumemeda on 16/4/22.
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var UserInfoStore = assign({}, EventEmitter.prototype, {
    name: "使用Jaccount登录",
    phone: "",
    studentId: 0,
    recommend_ids: [],

    getUserName: function() {
        return this.name;
    },

    setUserName: function(name) {
        this.name = name;
    },

    getUserPhone: function() {
        return this.phone;
    },

    setUserPhone: function(phone) {
        this.phone = phone;
    },

    getUserStudentId: function() {
        return this.studentId;
    },

    setUserStudentId: function(id) {
        this.studentId = id;
    },

    getUserRecommend: function() {
        return this.recommend_ids;
    },

    setUserRecommend: function(ids) {
        this.recommend_ids = ids;
    },

    getUserInfo: function () {
        return {
            name: this.getUserName(),
            phone: this.getUserPhone(),
            student_id: this.getUserStudentId(),
            recommend_ids: this.getUserRecommend()
        };
    },

    setUserInfo: function(json) {
        if (json['name']) this.setUserName(json['name']);
        if (json['phone']) this.setUserPhone(json['phone']);
        if (json['student_id']) this.setUserStudentId(json['student_id']);
        if (json['recommend_ids']) this.setUserRecommend(json['recommend_ids']);
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