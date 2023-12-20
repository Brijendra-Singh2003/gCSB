const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = require("./src/app");
const connection = require("./src/db/connection");
const server = http.createServer(app);

// TODO: add live score update
const socketIo = Server(server);

async function startServer() {
    await connection();

    server.listen(3000, ()=>{
        console.log("server live at http://localhost:3000 ");
    });
}

startServer();
