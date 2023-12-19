const express = require("express");
const { getGame, updateGame, removeGame } = require("./game.controller");
const protectAPI = require("../../lib/protectApi");
const gameRouter = express.Router();

gameRouter.get("/game", getGame);

gameRouter.post("/game", protectAPI, updateGame);

gameRouter.delete("/game", protectAPI, removeGame);

module.exports = gameRouter;
