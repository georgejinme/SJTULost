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

    selectItem: function(index) {
        if (this.selectedItems[0] == true) {
            if (index != 0) {
                this.selectedItems[0] = false;
                this.selectedItems[index] = true;
            }
        } else {
            if (index != 0) {
                if (this.countSelectedItems() > 1 || this.selectedItems[index] == false){
                    this.selectedItems[index] = !this.selectedItems[index];
                } else {
                    this.clearSelectedItems();
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

    getSelectedItemsId: function() {
        var ids = [];
        var all = false;
        if (this.selectedItems[0]){
            all = true;
        }
        for (var i = 1; i < this.items.length; ++i) {
            if (all || this.selectedItems[i]) ids.push(this.items[i]['id'])
        }
        return ids;
    },

    getSelectedItemsIdWithoutAll: function() {
        var ids = [];
        for (var i = 1; i < this.items.length; ++i) {
            if (this.selectedItems[i]) ids.push(this.items[i]['id'])
        }
        return ids;
    },


    emitChange: function () {
        this.emit('change');
    },

    emitSelect: function() {
        this.emit('select');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    addSelectListener: function(callback) {
        this.on('select', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },

    removeSelectListener: function(callback) {
        this.removeListener('select', callback);
    }

});

module.exports = ItemStore;