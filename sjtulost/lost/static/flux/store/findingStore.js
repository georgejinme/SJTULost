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

    getDefaultFinding: function() {
        return {
            id: 0,
            description: '',
            img: '',
            item_type: '',
            user_phone: '',
            time: '0000/00/00 00:00:00',
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
        if (this.findings.length == 0) return this.getDefaultFinding();
        else return this.findings[0]
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

module.exports = FindingStore;