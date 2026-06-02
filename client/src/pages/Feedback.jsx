import { useState } from "react";

export default function Feedback() {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const submitReview = async () => {
    try {
      const response = await fetch("https://kalakshepahub.onrender.com/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Chandan Shetty",
      rating,
      review,
    }),
  }
);

      const data = await response.json();

      if (data.success) {
        alert("Review Submitted Successfully ✅");
        setReview("");
        setRating(5);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit review");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px",
      }}
    >
      <h1>⭐ Feedback</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>Rating:</label>

        <select
          value={rating}
          onChange={(e) =>
            setRating(Number(e.target.value))
          }
          style={{
            marginLeft: "10px",
            padding: "8px",
          }}
        >
          <option value={5}>⭐⭐⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={1}>⭐</option>
        </select>
      </div>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your feedback..."
        rows="6"
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "15px",
          borderRadius: "10px",
        }}
      />

      <br />
      <br />

      <button
        onClick={submitReview}
        style={{
          padding: "12px 25px",
          background: "#f59e0b",
          color: "black",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Submit Review
      </button>
    </div>
  );
}