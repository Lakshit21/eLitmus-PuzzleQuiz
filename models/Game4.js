const mongoose = require('mongoose');

const game4Schema = new mongoose.Schema({
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

const Game4 = mongoose.model('Game4', game4Schema);

module.exports = Game4;
