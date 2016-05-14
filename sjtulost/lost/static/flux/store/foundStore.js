/**
 * Created by gougoumemeda on 16/4/25.
 */

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var FoundStore = assign({}, EventEmitter.prototype, {

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
         state:
     }
     */

    founds: [],
    updateResult: 0,

    getDefaultFound: function() {
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
            state: 0
        }
    },

    getFoundsWithAmount: function(amount=this.founds.count) {
        return this.founds.slice(0, amount);
    },

    setFounds: function(array) {
        this.founds = array;
    },

    getFirstFound: function() {
        if (this.founds.length == 0) {
            this.founds.push(this.getDefaultFound());
        }
        return this.founds[0]
    },

    getUpdateResult: function() {
        return this.updateResult
    },

    setUpdateResult: function(re) {
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

module.exports = FoundStore;