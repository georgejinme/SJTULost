/**
 * Created by gougoumemeda on 16/4/25.
 */



var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var FindingStore = assign({}, EventEmitter.prototype, {

    /*
     Each finding format:
     {
        description: string
        user_phone: string
        lost_time:
        lost_place:
        state:
     }
     */

    findings: [],

    getFindings: function() {
        return this.findings;
    },

    setFindings: function(array) {
        this.findings = array;
    },

    appendNewFinding: function(json) {
        this.findings.append(json)
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