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
        item_type:
        user_phone: string
        time:
        place:
        place_detail:
        detail:
        pay:
        state:
     }
     */

    findings: [],
    updateResult: 0,

    getDefaultFinding: function() {
        return {
            id: 0,
            description: '',
            img: '',
            item_type: '',
            user_phone: '',
            time: '',
            place: '',
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

module.exports = FindingStore;