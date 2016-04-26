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
        pay:
        state:
     }
     */

    findings: [],

    getFindingsWithAmount: function(amount=this.findings.count) {
        return this.findings.slice(0, amount);
    },

    setFindings: function(array) {
        this.findings = array;
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