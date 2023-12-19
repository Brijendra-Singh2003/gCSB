const express = require("express");
const teamsRouter = require("./routes/team/team.router");
const gameRouter = require("./routes/game/game.router");
const app = express();

app.use(express.json());
app.use(gameRouter);
app.use(teamsRouter);

// app.get("/", (req, res) => {
//     res.send("<h1>Hello, World!</h1>");
// });

app.get("*", (req, res) => {
    res.sendStatus(404);
});

module.exports = app;
