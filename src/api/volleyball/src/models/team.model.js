const Teams = require("./Team.mongo");

async function findTeam(id) {
    if(id) {
        return await Teams.findById(id);
    }
    return await Teams.find({}, {name: 1});
}

async function findTeamByName(name) {
    if(name) {
        return await Teams.findOne({name: name});
    }
    return await Teams.find({}, {name: 1});
}

async function saveTeam({_id, ...team}) {
    return await Teams.updateOne({name: team.name}, team, {upsert: true});
}

async function deleteTeam(id) {
    return await Teams.findByIdAndDelete(id);
}

module.exports = {
    findTeam,
    findTeamByName,
    saveTeam,
    deleteTeam,
}