const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = require("./src/app");
const connection = require("./src/db/connection");
const handleConnection = require("./src/socket");
const server = http.createServer(app);

// TODO: add live score update
const io = new Server(server);
io.on("connection", handleConnection);

async function startServer() {
    await connection();

    server.listen(80, ()=>{
        console.log("server live at \nhttp://localhost\t(local)\nhttp://192.168.108.10\t(public)");    // run 'ipconfig /all' to get your public ip
    });
}

startServer();
