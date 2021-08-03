const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:19006");
    next();
});
//app.use(cors());

// Run when client connects
io.on("connection", (socket) => {
    console.log("New WebSocket Connection...");
    socket.on("chat message", (message) => {
        console.log(message);
        io.emit("chat message", message);
    });
});

const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
