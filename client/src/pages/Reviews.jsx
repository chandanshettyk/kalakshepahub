import { useEffect, useState } from "react";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch("https://kalakshepahub.onrender.com/api/reviews")
    .then((res) => res.json())
    .then((data) => {
      console.log("Reviews:", data);
      setReviews(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Fetch Error:", err);
      setLoading(false);
    });
}, []);

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
        ⭐ User Reviews
      </h1>

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
          }}
        >
          {reviews.map((item) => (
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