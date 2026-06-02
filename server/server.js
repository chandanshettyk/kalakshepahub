const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
console.log("MONGO URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error");
    console.error(err);
  });

// HTTP Server
const server = http.createServer(app);

// Socket.IO
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

// ======================
// Review Model
// ======================

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Anonymous",
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model(
  "Review",
  reviewSchema
);

// ======================
// Chat Message Model
// ======================

const messageSchema = new mongoose.Schema(
  {
    room: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model(
  "Message",
  messageSchema
);


// ======================
// Review Routes
// ======================

app.post("/api/reviews", async (req, res) => {
  try {
    console.log("📩 Review Received:", req.body);

    const { name, rating, review } = req.body;

    const newReview = new Review({
      name,
      rating,
      review,
    });

    await newReview.save();

    console.log("✅ Review Saved:", newReview);

    res.status(201).json({
      success: true,
      message: "Review saved successfully",
      review: newReview,
    });
  } catch (error) {
    console.log("❌ Review Save Error:");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.find().sort({
      createdAt: -1,
    });

    console.log(`📋 Reviews Found: ${reviews.length}`);

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ======================
// Chat Routes
// ======================

// Get all messages of a room

app.get("/api/messages/:room", async (req, res) => {
  try {
    const messages = await Message.find({
      room: req.params.room,
    }).sort({
      createdAt: 1,
    });

    res.json(messages);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Save Message

app.post("/api/messages", async (req, res) => {
  try {
    const { room, author, message } = req.body;

    const newMessage = new Message({
      room,
      author,
      message,
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      message: "Message saved",
      data: newMessage,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ======================
// Chess Rooms
// ======================

const chessRooms = {};

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // Chat Room

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`${socket.id} joined room ${room}`);
  });

  socket.on("send_message", async (data) => {
  try {
    const newMessage = new Message({
      room: data.room,
      author: data.author,
      message: data.message,
    });

    await newMessage.save();

    console.log("💬 Message Saved");

    io.to(data.room).emit(
      "receive_message",
      {
        ...data,
        createdAt: newMessage.createdAt,
      }
    );
  } catch (error) {
    console.error(
      "❌ Message Save Error",
      error
    );
  }
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
      chessRooms[room][0] === socket.id
        ? "white"
        : "black";

    socket.emit("player_color", color);

    console.log(
      `${socket.id} joined chess room ${room} as ${color}`
    );
  });

  socket.on("move_piece", (data) => {
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

// Home Route

app.get("/", (req, res) => {
  res.send("KalakshepaHub Server Running 🚀");
});

// Start Server

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});