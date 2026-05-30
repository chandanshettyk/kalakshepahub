const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "https://kalakshepa-client.onrender.com",
        ],
        methods: ["GET", "POST"],
        credentials: true,
    },
});

const chessRooms = {};

io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    // Chat Room

    socket.on("join_room", (room) => {
        socket.join(room);
        console.log(`${socket.id} joined room ${room}`);
    });

    socket.on("send_message", (data) => {
        io.to(data.room).emit("receive_message", data);
    });

    // Chess Room

    socket.on("join_chess_room", (room) => {
        socket.join(room);

        if (!chessRooms[room]) {
            chessRooms[room] = [];
        }

        if (chessRooms[room].length < 2) {
            chessRooms[room].push(socket.id);
        }

        const color =
            chessRooms[room][0] === socket.id ?
            "white" :
            "black";

        socket.emit("player_color", color);

        console.log(
            `${socket.id} joined chess room ${room} as ${color}`
        );
    });

    socket.on("move_piece", (data) => {
        console.log("Move Received:", data);

        socket.to(data.room).emit(
            "receive_move",
            data.fen
        );
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id);

        for (const room in chessRooms) {
            chessRooms[room] = chessRooms[room].filter(
                (id) => id !== socket.id
            );

            if (chessRooms[room].length === 0) {
                delete chessRooms[room];
            }
        }
    });
});

app.get("/", (req, res) => {
    res.send("ConnectHub Server Running 🚀");
});

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});