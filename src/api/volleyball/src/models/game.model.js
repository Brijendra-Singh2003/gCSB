const Games = require("./game.mongo");
const { deleteScores } = require("./score.model");

async function getOneGame(id) {
    return await Games.findById(id);
}

async function getAllGames(series) {
    if (series) return await Games.find({ series: series });

    return await Games.find();
}

async function saveGame(game) {
    try {
        return await Games.updateOne({ name: game.name }, game, { upsert: true });
    } catch (error) {
        console.log("error occured when saving game: ", game, error);
    }
}

async function deleteGame(id) {
    const score = deleteScores(id);
    const game = Games.findByIdAndDelete(id);
    return await Promise.allSettled([score, game]);
}

module.exports = {
    getOneGame,
    getAllGames,
    saveGame,
    deleteGame,
};
