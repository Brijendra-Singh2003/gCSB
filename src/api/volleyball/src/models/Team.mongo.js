const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    name   : { unique: true, type: String, required: true },
    mp     : { type: Number, default: 0 },
    w      : { type: Number, default: 0 },
    l      : { type: Number, default: 0 },
    sw     : { type: Number, default: 0 },
    sl     : { type: Number, default: 0 },
    players: [
        {
            name: { type: String, required: true },
            role: String,
        }
    ]
});

module.exports = mongoose.model("Team", TeamSchema);
