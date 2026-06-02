const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

console.log("MONGO URI EXISTS:", !!process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error");
    console.log(err);
  });

// Home Route
app.get("/", (req, res) => {
  res.send("KalakshepaHub Server Running 🚀");
});

// Review Schema
const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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

const Review = mongoose.model("Review", reviewSchema);

// Save Review
app.post("/api/reviews", async (req, res) => {
  try {
    const { name, rating, review } = req.body;

    const newReview = new Review({
      name,
      rating,
      review,
    });

    await newReview.save();

    res.status(201).json({
      success: true,
      message: "Review saved successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to save review",
    });
  }
});

// Get All Reviews
app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.find().sort({
      createdAt: -1,
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});