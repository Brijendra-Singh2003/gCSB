const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
    id: { type: mongoose.Types.ObjectId, required: true },
    home: {
        name: { type: String },
        w   : { type: Number, default: 0 },
        l   : { type: Number, default: 0 }
    },
    away: {
        name: { type: String },
        w   : { type: Number, default: 0 },
        l   : { type: Number, default: 0 }
    },
    set1: { home: Number, away: Number },
    set2: { home: Number, away: Number },
    set3: { home: Number, away: Number },
    set4: { home: Number, away: Number },
    set5: { home: Number, away: Number },
});

module.exports = mongoose.model("Score", ScoreSchema);
