const Games = require("./game.mongo");
const { deleteScores } = require("./score.model");

async function findGame(id) {
    if(id) {
        return await Games.findById(id);
    }
    return await Games.find();
}

async function saveGame({_id, ...rest}) {
    try {
        return await Games.findByIdAndUpdate(_id, rest, { upsert: true });
    } catch (error) {
        console.log("error occured when saving game: ", {_id, ...rest}, error);
    }
}

async function deleteGame(id) {
    const score = deleteScores(id);
    const game = Games.findByIdAndDelete(id);
    return await Promise.allSettled([score, game]);
}

module.exports = {
    findGame,
    saveGame,
    deleteGame,
};
