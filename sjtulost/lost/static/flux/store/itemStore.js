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

      selectedItems: [Bool]
     */

    items: [],
    selectedItems: [],

    selectItem: function(id) {
        if (this.selectedItems[0] == true) {
            if (id != 0) {
                this.selectedItems[0] = false;
                this.selectedItems[id] = true;
            }
        } else {
            if (id != 0) {
                if (this.countSelectedItems() > 1 || this.selectedItems[id] == false){
                    this.selectedItems[id] = !this.selectedItems[id];
                }
            } else {
                this.clearSelectedItems();
            }
        }
    },

    clearSelectedItems: function() {
        this.selectedItems = [];
        for (var i = 0; i < this.items.length; ++i) {
            this.selectedItems.push(false);
        }
        this.selectedItems[0] = true;
    },

    countSelectedItems: function() {
        var count = 0;
        for (var i = 0; i < this.selectedItems.length; ++i) {
            if (this.selectedItems[i] == true) ++count;
        }
        return count;
    },

    getItems: function() {
        return this.items
    },

    setItems: function(array) {
        this.items = array;
        this.items.unshift({
            'id': 0,
            'description': '全部'
        });
        this.clearSelectedItems();
    },

    getSelectedItems: function() {
        return this.selectedItems
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