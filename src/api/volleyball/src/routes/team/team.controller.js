const { request, response } = require("express");
const {
    findTeam,
    saveTeam,
    deleteTeam,
} = require("../../models/team.model");

/**@param {request} req @param {response} res*/
async function getTeam(req, res) {
    res.json( await findTeam(req.query.name) );
}

/**@param {request} req @param {response} res*/
async function updateTeam(req, res) {
    const team = req.body;

    if (team.name) {
        res.json(await saveTeam(team));
    } else {
        res.status(401).send("team name is required");
    }
}

/**@param {request} req @param {response} res*/
async function removeTeam(req, res) {
    res.json((await deleteTeam(req.body._id)));
}

module.exports = {
    getTeam,
    updateTeam,
    removeTeam,
};
