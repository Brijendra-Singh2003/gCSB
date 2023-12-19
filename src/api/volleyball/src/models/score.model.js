const Scores = require("./score.mongo");

async function getScores(id) {
    return Scores.findOne({id: id});
}

async function setScores(score) {
    return await Scores.updateOne({id: score.id}, score, {upsert: true});
}

async function deleteScores(id) {
    return await Scores.findOneAndDelete({id: id});
}

module.exports = {
    getScores,
    setScores,
    deleteScores
};
