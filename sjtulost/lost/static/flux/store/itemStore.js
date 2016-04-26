/**
 * Created by gougoumemeda on 16/4/25.
 */


var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ItemStore = assign({}, EventEmitter.prototype, {
    /*
      Each item format:
      {
        id:
        description:
      }
     */

    items: [],

    getItems: function() {
        return this.items
    },

    setItems: function(array) {
        this.items = array
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

module.exports = ItemStore;