const scoreRouter = require("express").Router();
const { getScores } = require("../../models/score.model");
const scores = require("../../models/score.mongo");

let clients = [];
const changeStream = setupChangeStream();

const headers = {
    "Content-Type": "text/event-stream",
    "Connection": "keep-alive",
    "Cache-Control": "no-cache"
};

scoreRouter.get("/sse", (req, res) => {
    res.writeHead(200, headers);

    clients.push(res);
    
    // let count = 0;
    // const t = setInterval(()=>{
    //     res.write(`${count++}`);
    // }, 1000);

    res.on("close", ()=> {
        console.log("connection closed");
        clearInterval(t);
        clients = clients.filter(client => client !== res);
    });
});

function broadcast(data) {
    const message = JSON.stringify(data);
    clients.forEach(client => {
        client.write(message);
    });
}

scoreRouter.get("/score", (req, res) => {
    const gameId = req.query.id;
    getScores(gameId);
});

function setupChangeStream() {
    const changeStream = scores.watch();

    changeStream.on("change", (changes) => {
        const changedFeilds = changes?.updateDescription?.updatedFields;
        console.log("changed feilds", changedFeilds);
        broadcast(changedFeilds);
    });

    changeStream.on("error", err => {
        console.log("changeStream error: ", err);
        
        reconnect();
    });

    changeStream.on("close", () => {
        console.log("changestream closed");

        reconnect();
    });

    return changeStream;
}

function reconnect() {
    setTimeout(() => {
        console.log("reconnecting...");

        const newChangeStream = setupChangeStream();
        changeStream.removeAllListeners();
        changeStream.close();
        changeStream = newChangeStream;
    }, 5000);
}

module.exports = scoreRouter;
