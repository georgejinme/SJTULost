/**
 * Created by gougoumemeda on 16/4/25.
 */


var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var PlaceStore = assign({}, EventEmitter.prototype, {
    /*
    Each place format:
    {
        id:
        description:
    }

    selectedPlaces: [Bool]
     */

    places: [],
    selectedPlaces: [],

    selectPlace: function(id) {
        if (this.selectedPlaces[0] == true) {
            if (id != 0) {
                this.selectedPlaces[0] = false;
                this.selectedPlaces[id] = true;
            }
        } else {
            if (id != 0) {
                if (this.countSelectedPlaces() > 1 || this.selectedPlaces[id] == false){
                    this.selectedPlaces[id] = !this.selectedPlaces[id];
                }
            } else {
                this.clearSelectedPlaces();
            }
        }
    },

    clearSelectedPlaces: function() {
        this.selectedPlaces = [];
        for (var i = 0; i < this.places.length; ++i) {
            this.selectedPlaces.push(false);
        }
        this.selectedPlaces[0] = true;
    },

    countSelectedPlaces: function() {
        var count = 0;
        for (var i = 0; i < this.selectedPlaces.length; ++i) {
            if (this.selectedPlaces[i] == true) ++count;
        }
        return count;
    },

    getPlaces: function() {
        return this.places
    },

    setPlaces: function(array) {
        this.places = array;
        this.places.unshift({
            'id': 0,
            'description': '全部'
        });
        this.clearSelectedPlaces()
    },

    getSelectedPlaces: function() {
        return this.selectedPlaces
    },

    getSelectedPlacesId: function() {
        var ids = [];
        var all = false;
        if (this.selectedPlaces[0]){
            all = true;
        }
        for (var i = 1; i < this.places.length; ++i) {
            if (all || this.selectedPlaces[i]) ids.push(this.places[i]['id'])
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

module.exports = PlaceStore;
