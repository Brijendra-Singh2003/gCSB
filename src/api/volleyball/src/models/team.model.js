const Teams = require("./Team.mongo");

async function findTeam(id) {
    if(id) {
        return await Teams.findById(id);
    }
    return await Teams.find({}, {name: 1});
}

async function saveTeam(team) {
    return await Teams.updateOne({name: team.name}, team, {upsert: true});
}

async function deleteTeam(id) {
    return await Teams.findByIdAndDelete(id);
}

module.exports = {
    findTeam,
    saveTeam,
    deleteTeam,
}