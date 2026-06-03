import { useEffect, useState } from "react";

export default function Reviews() {
const [reviews, setReviews] = useState([]);
const [loading, setLoading] = useState(true);
const [selectedRating, setSelectedRating] = useState(0);

useEffect(() => {
fetch("https://kalakshepahub.onrender.com/api/reviews")
.then((res) => res.json())
.then((data) => {
setReviews(data);
setLoading(false);
})
.catch((err) => {
console.error("Fetch Error:", err);
setLoading(false);
});
}, []);

const filteredReviews =
selectedRating === 0
? reviews
: reviews.filter(
(item) => item.rating === selectedRating
);

const averageRating =
reviews.length > 0
? (
reviews.reduce(
(sum, item) => sum + item.rating,
0
) / reviews.length
).toFixed(1)
: 0;

return (
<div
style={{
minHeight: "100vh",
padding: "40px",
background:
"linear-gradient(135deg, #0f172a, #1e1b4b)",
color: "white",
}}
>
<h1
style={{
fontSize: "36px",
marginBottom: "30px",
textAlign: "center",
}}
>
⭐ User Reviews </h1>


  {!loading && reviews.length > 0 && (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto 30px auto",
        background: "#1f2937",
        padding: "20px",
        borderRadius: "15px",
        textAlign: "center",
      }}
    >
      <h2>{averageRating} / 5 ⭐</h2>
      <p>{reviews.length} Total Reviews</p>

      {[5, 4, 3, 2, 1].map((star) => (
        <button
          key={star}
          onClick={() => setSelectedRating(star)}
          style={{
            margin: "5px",
            padding: "8px 15px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {star} ⭐
        </button>
      ))}

      <button
        onClick={() => setSelectedRating(0)}
        style={{
          margin: "5px",
          padding: "8px 15px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        All Reviews
      </button>
    </div>
  )}

  {loading ? (
    <h3 style={{ textAlign: "center" }}>
      Loading Reviews...
    </h3>
  ) : reviews.length === 0 ? (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <h2>No Reviews Yet 😔</h2>
      <p>Be the first user to leave feedback.</p>
    </div>
  ) : (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        maxHeight: "55vh",
        overflowY: "auto",
        paddingRight: "10px",
      }}
    >
      {filteredReviews.map((item) => (
        <div
          key={item._id}
          style={{
            background: "#1f2937",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "15px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.3)",
            border: "1px solid #374151",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <h3
              style={{
                margin: 0,
                color: "#60a5fa",
              }}
            >
              {item.name || "Anonymous"}
            </h3>

            <span
              style={{
                fontSize: "14px",
                color: "#9ca3af",
              }}
            >
              {new Date(
                item.createdAt
              ).toLocaleString()}
            </span>
          </div>

          <div
            style={{
              fontSize: "20px",
              marginBottom: "10px",
            }}
          >
            {"⭐".repeat(item.rating)}
          </div>

          <p
            style={{
              margin: 0,
              lineHeight: "1.7",
              color: "#e5e7eb",
            }}
          >
            {item.review}
          </p>
        </div>
      ))}
    </div>
  )}
</div>

);
}
