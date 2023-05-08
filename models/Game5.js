const mongoose = require('mongoose');

const game5Schema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    score: {
        type:Number
    }
    // date: { type: Date, default: Date.now },
});

const Game5 = mongoose.model('Game5', game5Schema);

module.exports = Game5;
