const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    series: String,

    home: {
        type: String,
        required: true
    },
    away: {
        type: String,
        required: true
    },

    status: String,
    date: String,
});

module.exports = mongoose.model("Game", GameSchema);
