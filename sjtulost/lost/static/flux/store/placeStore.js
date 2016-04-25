/**
 * Created by gougoumemeda on 16/4/25.
 */


var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var PlaceStore = assign({}, EventEmitter.prototype, {
    descriptions: [],

    getDescriptions: function() {
        return this.descriptions
    },

    setDescriptions: function(array) {
        this.descriptions = array
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

module.exports = PlaceStore;
