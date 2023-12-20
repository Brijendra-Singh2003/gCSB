const express = require("express");
const cors = require("cors");
// const path = require("path");
const teamsRouter = require("./routes/team/team.router");
const gameRouter = require("./routes/game/game.router");
const scoreRouter = require("./routes/score/score.router");
const app = express();

app.use(cors({ origin: "*" }))
app.use(express.json());
app.use(gameRouter);
app.use(teamsRouter);
app.use(scoreRouter);
// app.use(express.static(path.join(__dirname, "..", "secrets", "build")));

// app.get("/", (req, res) => {
//     res.send("<h1>Hello, World!</h1>");
// });

app.get("*", (req, res) => {
    res.sendStatus(404);
});

module.exports = app;
