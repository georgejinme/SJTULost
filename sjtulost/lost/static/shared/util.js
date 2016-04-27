/**
 * Created by gougoumemeda on 16/4/26.
 */

var idOperation = {
    encodeId: function(type, id) {
        return type + '|' + id
    },

    decodeId: function(str) {
        return str.split('|')[1]
    }
};


module.exports = idOperation;