const express = require("express");
const { getTeam, updateTeam, removeTeam } = require("./team.controller");
const protectAPI = require("../../middleware/protectApi");
const teamsRouter = express.Router();

teamsRouter.get("/team", getTeam);

teamsRouter.post("/team", protectAPI, updateTeam);

teamsRouter.delete("/team", protectAPI, removeTeam);

module.exports = teamsRouter;
