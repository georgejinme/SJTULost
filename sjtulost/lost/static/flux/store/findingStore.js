/**
 * Created by gougoumemeda on 16/4/25.
 */



var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var FindingStore = assign({}, EventEmitter.prototype, {

    /*
     Each finding format:
     {
        id:
        description: string
        img: string
        item_type
        item_type_ids
        user_phone: string
        time:
        place:
        place_ids
        place_detail:
        detail:
        pay:
        state:
     }
     */

    findings: [],
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

    getDefaultFinding: function() {
        return {
            id: 0,
            description: '',
            img: '',
            item_type: '',
            item_type_ids: [],
            user_phone: '',
            time: '',
            place: '',
            place_ids: [],
            place_detail: '',
            detail: '',
            pay: 0,
            state: 0
        }
    },


    getFindingsWithAmount: function(amount=this.findings.count) {
        return this.findings.slice(0, amount);
    },

    setFindings: function(array) {
        this.findings = array;
    },

    setDescription: function(d) {
        this.findings[0]['description'] = d;
    },

    setImage: function (i) {
        this.findings[0]['img'] = i;
    },

    setItemTypeWithId: function(ids) {
        this.findings[0]['item_type_ids'] = ids
    },

    setPlacesWithId: function(ids) {
        this.findings[0]['place_ids'] = ids
    },

    setTime: function(t) {
        this.findings[0]['time'] = t
    },

    setPlaceDetail: function(pd) {
        this.findings[0]['place_detail'] = pd
    },

    setDetail: function(d) {
        this.findings[0]['detail'] = d
    },

    setPay: function(p) {
        this.findings[0]['pay'] = p
    },

    getFirstFinding: function() {
        if (this.findings.length == 0) {
            this.findings.push(this.getDefaultFinding());
        }
        return this.findings[0]
    },

    getUpdateResult: function() {
        return this.updateResult
    },

    setUpdateResult: function(re){
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

module.exports = FindingStore;