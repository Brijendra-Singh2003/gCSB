const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String,
        required: true,
    },
    players: [
        {
            name: {
                type: String,
                required: true,
            },
            role: String,
        },
    ],
});

module.exports = mongoose.model("Team", TeamSchema);
