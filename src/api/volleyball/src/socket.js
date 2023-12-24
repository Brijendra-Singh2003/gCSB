const { Socket } = require("socket.io");
const { setScores, getScores } = require("./models/score.model");
const { saveGame, findGame } = require("./models/game.model");
const { findTeamByName, saveTeam } = require("./models/team.model");

/**@param {Socket} socket*/
function handleConnection(socket) {

    console.log(`socket ${socket.id} connected`);

    socket.once("start", async (gameID, apiKey)=>{

        const game = await findGame(gameID);
        game._id = game.id;
        console.log("starting game:", game);

        if(apiKey !== process.env.API_KEY || !(game && game.status !== "ended")) {
            console.log("bad request: ", apiKey, gameID);
            socket.emit("error", {apiKey, game});
            return;
        };

        let score = await getScores(game._id) || {
            id: game._id,
            home: { name: game.home, w: 0, l: 0 },
            away: { name: game.away, w: 0, l: 0 },
            set1: { home: 0, away: 0 }
        };

        const p1 = setScores(score);
        const p2 = saveGame({...game, status: "live"});

        await Promise.allSettled([p1, p2]);

        console.log("sending score: ", score);
        socket.emit("score", score);

        socket.on("change",async (data) => {
            await setScores(data);
            console.log("change success: ", data);
        });

        socket.on("end",async (data) => {
            await setScores(data);
            const [home, away] = await Promise.all([findTeamByName(game.home), findTeamByName(game.away)]);

            home.mp += 1;
            home.sw += data.home.w;
            home.sl += data.home.l;
            away.mp += 1;
            away.sw += data.away.w;
            away.sl += data.away.l;

            if(data.home.w > data.away.w) {
                home.w += 1;
                away.l += 1;
            }
            if(data.home.w < data.away.w) {
                away.w += 1;
                home.l += 1;
            }

            game.status = "ended";
            
            saveTeam(home);
            saveTeam(away);
            saveGame(game);
            
            console.log("result: ", data);
            console.log("home: ", home);
            console.log("away: ", away);
            console.log("game: ", game);
        });

    });

    socket.on("disconnect", (reason) => {
        console.log(`socket ${socket.id} disconnected due to ${reason}`);
    });
}

module.exports = handleConnection;
