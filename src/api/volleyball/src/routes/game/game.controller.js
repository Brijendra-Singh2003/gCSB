const { request, response } = require("express");
const { findGame, saveGame, deleteGame } = require("../../models/game.model");

/**@param {request} req @param {response} res*/
async function getGame(req, res) {
    res.json(await findGame(req.query.id));
}

/**@param {request} req @param {response} res*/
async function updateGame(req, res) {
    const game = req.body;

    if (game.name && game.home && game.away) {
        res.json(await saveGame(game));
    } else {
        res.status(401).send("name, home and away are required");
    }
}

/**@param {request} req @param {response} res*/
async function removeGame(req, res) {
    res.json((await deleteGame(req.body._id)));
}

module.exports = {
    getGame,
    updateGame,
    removeGame,
};
