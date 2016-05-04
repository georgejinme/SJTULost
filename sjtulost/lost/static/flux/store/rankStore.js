/**
 * Created by gougoumemeda on 16/5/4.
 */


var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var RankStore = assign({}, EventEmitter.prototype, {
    /*
        each rank:
        {
            no:
            name:
            student_id:
            times:
        }
     */
    ranks: [],

    getRanks: function(){
        return this.ranks
    },

    setRanks: function(array){
        this.ranks = array
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

module.exports = RankStore;