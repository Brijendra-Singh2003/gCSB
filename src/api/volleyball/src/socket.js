const { Socket } = require("socket.io");
const { setScores } = require("./models/score.model");
const { saveGame } = require("./models/game.model");
const { findTeamByName, saveTeam } = require("./models/team.model");

/**@param {Socket} socket*/
function handleConnection(socket) {

    console.log(`socket ${socket.id} connected`);

    socket.once("start", async (game, apiKey)=>{
        if(apiKey !== process.env.API_KEY || !(game._id && game.home && game.away)) return;

        let score = {
            id: game._id,
            home: {
                name: game.home,
                w: 0,
                l: 0
            },
            away: {
                name: game.away,
                w: 0,
                l: 0
            }
        };

        const p1 = setScores(score);
        const p2 = saveGame({...game, status: "live"});

        await Promise.allSettled([p1, p2]);

        socket.emit("score", score);

        socket.on("change", (data) => {
            setScores(data);
        });

        socket.on("end",async (data) => {
            const [home, away] = Promise.allSettled([findTeamByName(game.home), findTeamByName(game.away)]);

            home.sw += data.home.w;
            away.sw += data.away.w;
            home.sl += data.home.l;
            away.sl += data.away.l;

            if(data.home.w > data.away.w) {
                home.w += 1;
                away.l += 1;
            }
            if(data.home.w < data.away.w) {
                away.w += 1;
                home.l += 1;
            }

            saveTeam(home);
            saveTeam(away);

        });

    });

    socket.on("disconnect", (reason) => {
        console.log(`socket ${socket.id} disconnected due to ${reason}`);
    });
}

module.exports = handleConnection;
