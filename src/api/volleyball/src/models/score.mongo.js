const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    home: {
        type: String,
        required: true
    },
    away: {
        type: String,
        required: true
    },
    set1: {
        home: Number,
        away: Number
    },
    set2: {
        home: Number,
        away: Number
    },
    set3: {
        home: Number,
        away: Number
    },
    set4: {
        home: Number,
        away: Number
    },
    set5: {
        home: Number,
        away: Number
    },
});

module.exports = mongoose.model("Score", ScoreSchema);
