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

    getDefaultFound: function() {
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
            state: 0
        }
    },

    getFoundsWithAmount: function(amount=this.founds.count) {
        return this.founds.slice(0, amount);
    },

    setFounds: function(array) {
        this.founds = array;
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