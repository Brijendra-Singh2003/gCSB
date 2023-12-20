const { getScores } = require("../../models/score.model");

const scoreRouter = require("express").Router();

const headers = {
    "Content-Type": "text/event-stream",
    "Connection": "keep-alive",
    "Cache-Control": "no-cache"
};

scoreRouter.get("/sse", (req, res) => {
    res.writeHead(200, headers);

    let count = 0;

    const t = setInterval(()=>{
        res.write(`${count++}`);
    }, 1000);

    res.on("close", ()=> {
        console.log("connection closed");
        clearInterval(t);
    });
});

scoreRouter.get("/score", (req, res) => {
    const gameId = req.query.id;
    getScores(gameId);
});

module.exports = scoreRouter;