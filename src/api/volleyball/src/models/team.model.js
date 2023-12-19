const Teams = require("./Team.mongo");

async function getOneTeam(id) {
    return await Teams.findById(id);
}

async function getAllTeams() {
    return await Teams.find({}, {name: 1});
}

async function saveTeam(team) {
    return await Teams.updateOne({name: team.name}, team, {upsert: true});
}

async function deleteTeam(id) {
    return await Teams.findByIdAndDelete(id);
}

module.exports = {
    getOneTeam,
    getAllTeams,
    saveTeam,
    deleteTeam,
}