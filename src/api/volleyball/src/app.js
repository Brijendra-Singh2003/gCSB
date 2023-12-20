const express = require("express");
const path = require("path");
const teamsRouter = require("./routes/team/team.router");
const gameRouter = require("./routes/game/game.router");
const app = express();

app.use(express.json());
app.use(gameRouter);
app.use(teamsRouter);
// app.use(express.static(path.join(__dirname, "..", "secrets", "build")));

// app.get("/", (req, res) => {
//     res.send("<h1>Hello, World!</h1>");
// });

app.get("*", (req, res) => {
    res.sendStatus(404);
});

module.exports = app;
