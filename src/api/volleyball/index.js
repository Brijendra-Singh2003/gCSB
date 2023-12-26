require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

const app = require("./src/app");
const { connectToDB } = require("./src/db/connection");
const handleConnection = require("./src/socket");
const server = http.createServer(app);

const port = process.env.PORT || 3000;
const io = new Server(server);

io.on("connection", handleConnection);

async function startServer() {
    await connectToDB();

    server.listen(port, ()=>{
        console.log(`server live at
            http://localhost:${port}        (local)
            http://192.168.108.10:${port}   (public)
        `);
    });
}

startServer();
