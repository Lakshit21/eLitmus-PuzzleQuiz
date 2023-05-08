const mongoose = require('mongoose');

const game3Schema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    correct:{
        type : Number
    },
    wrong:{
        type :Number
    },
    hint:{
        type :Number
    }
    // date: { type: Date, default: Date.now },
});

const Game3 = mongoose.model('Game3', game3Schema);

module.exports = Game3;
