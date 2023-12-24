const home = document.getElementById("home");
const away = document.getElementById("away");
const start_btn = document.getElementById("start_btn");

let score = {
  id: "6586c84da6f70ce4eadf0dc7",
  home: { name: "it", w: 0, l: 0 },
  away: { name: "ce", w: 0, l: 0 },
  set1: { home: 0, away: 0 }
};
const game = {
  _id: "6586c84da6f70ce4eadf0dc7",
  name: "cs vs it",
  away: "ce",
  date: "21 Oct 2024",
  home: "it",
  status: "live",
  __v: 0,
};

start_btn.onclick = () => {
  const socket = io();

  socket.on("connect", () => {
    console.log(socket.id);
    socket.emit("start", game._id, "iPFz06qRLPMMGyl9F5DfIVJ08ARXmQQF");

    socket.on("score", (data) => {
      console.log("data: ", data);
      score = { ...score, ...data };
      console.log("score: ", score);
      home.value = data.set1.home;
      away.value = data.set1.away;
    });

    function checkWinner() {
      const {set1: {home, away}} = score;
      if(home > 24 && home - away > 1) {
        score.home.w = 1;
        score.away.l = 1;
        socket.emit("end", score);
      }
      if(away > 24 && away - home > 1) {
        score.away.w = 1;
        score.home.l = 1;
        socket.emit("end", score);
      }
    }

    home.onchange = () => {
      score.set1.home = home.value;
      socket.emit("change", score);

      checkWinner();
    };

    away.onchange = () => {
      score.set1.away = away.value;
      socket.emit("change", score);

      checkWinner();
    };
  });

  start_btn.hidden = true;
}
