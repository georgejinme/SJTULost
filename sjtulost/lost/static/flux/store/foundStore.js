/**
 * Created by gougoumemeda on 16/4/25.
 */

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var FoundStore = assign({}, EventEmitter.prototype, {

    /*
     Each finding format:
     {
         id:
         description: string
         img: string
         item_type:
         item_type_ids
         user_phone: string
         time:
         place:
         place_id
         place_detail:
         detail:
         state:
     }
     */

    founds: [],
    /*
     0: success
     1: fail
     */
    updateResult: 0,
    /*
     -1: 选择文件
     0: success
     1: fail
     2: uploading
     */
    uploadImageStatus: -1,
    getDefaultFound: function() {
        return {
            id: 0,
            description: '',
            img: '',
            item_type: '',
            item_type_ids: [],
            user_phone: '',
            time: '',
            place: '',
            place_id: 0,
            place_detail: '',
            detail: '',
            state: 0
        }
    },

    getFoundsWithAmount: function(amount=this.founds.count) {
        return this.founds.slice(0, amount);
    },

    setFounds: function(array) {
        this.founds = array;
    },

    setDescription: function(d) {
        this.founds[0]['description'] = d;
    },

    setImage: function (i) {
        this.founds[0]['img'] = i;
    },

    setItemTypeWithId: function(ids) {
        this.founds[0]['item_type_ids'] = ids
    },

    setPlacesWithId: function(id) {
        this.founds[0]['place_id'] = id
    },

    setTime: function(t) {
        this.founds[0]['time'] = t
    },

    setPlaceDetail: function(pd) {
        this.founds[0]['place_detail'] = pd
    },

    setDetail: function(d) {
        this.founds[0]['detail'] = d
    },

    getFirstFound: function() {
        if (this.founds.length == 0) {
            this.founds.push(this.getDefaultFound());
        }
        return this.founds[0]
    },

    getUpdateResult: function() {
        return this.updateResult
    },

    setUpdateResult: function(re) {
        this.updateResult = re
    },

    getUploadImageStatus: function(){
        return this.uploadImageStatus
    },

    setUploadImageStatus: function(s) {
        this.uploadImageStatus = s
    },

    emitChange: function () {
        this.emit('change');
    },

    emitUpdateResult: function() {
        this.emit('update')
    },

    emitUploadImage: function() {
        this.emit('upload')
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
    },

    addUploadImageListener: function(callback) {
        this.on('upload', callback);
    },

    removeUploadImageListener: function(callback) {
        this.removeListener('upload', callback);
    }

});

module.exports = FoundStore;