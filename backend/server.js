const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

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
    socket.on("join", ({ name, selectedRoom }, callback) => {
        const { error, user } = addUser({
            id: socket.id,
            name,
            room: selectedRoom,
        });
        if (error) return callback(error);
        socket.join(user.room);
        socket.broadcast.to(user.room).emit("message", {
            user: "ChatBot",
            text: `User ${name} joined room ${selectedRoom}`,
        });
    });
    socket.on("sendMessage", (message) => {
        const user = getUser(socket.id);
        io.to(user.room).emit("message", { user: user.name, text: message });
    });
    socket.on("disconnect", () => {
        const user = getUser(socket.id);
        socket.broadcast.to(user.room).emit("message", {
            user: "ChatBot",
            text: `User ${user.name} disconnected`,
        });
        console.log(`User disconnected`);
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
