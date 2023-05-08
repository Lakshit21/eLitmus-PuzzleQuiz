const mongoose = require('mongoose');

const game1Schema = new mongoose.Schema({
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

const Game1 = mongoose.model('Game1', game1Schema);

module.exports = Game1;
