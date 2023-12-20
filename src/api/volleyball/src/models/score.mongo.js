const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    home: {
        type: {
            name: {
                type: String,
                required: true,
            },
            w: {
                type: Number,
                default: 0
            },
            l: {
                type: Number,
                default: 0
            },
        },
        required: true,
    },
    away: {
        type: {
            name: {
                type: String,
                required: true,
            },
            w: {
                type: Number,
                default: 0
            },
            l: {
                type: Number,
                default: 0
            },
        },
        required: true,
    },
    set1: {
        home: Number,
        away: Number,
    },
    set2: {
        home: Number,
        away: Number,
    },
    set3: {
        home: Number,
        away: Number,
    },
    set4: {
        home: Number,
        away: Number,
    },
    set5: {
        home: Number,
        away: Number,
    },
});

module.exports = mongoose.model("Score", ScoreSchema);
