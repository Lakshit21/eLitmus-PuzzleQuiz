const mongoose = require('mongoose');

const game2Schema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    correct: {
        type:Number
    },
    wrong:{
        type:Number
    },
    skip:{
        type:Number
    }
    // date: { type: Date, default: Date.now },
});

const Game2 = mongoose.model('Game2', game2Schema);

module.exports = Game2;
