/**
 * Created by gougoumemeda on 16/4/25.
 */

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var FoundStore = assign({}, EventEmitter.prototype, {

    /*
     Each finding format:
     {
     description: string
     img: string
     user_phone: string
     lost_time:
     lost_place:
     state:
     }
     */

    founds: [],
    getFoundsWithAmount: function(amount=this.founds.count) {
        return this.founds.slice(0, amount);
    },

    setFounds: function(array) {
        this.founds = array;
    },

    appendNewFound: function(json) {
        this.founds.append(json)
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

module.exports = FoundStore;