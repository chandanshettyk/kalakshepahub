import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function Dashboard() {
  const { user } = useUser();

  const cardStyle = {
    width: "260px",
    height: "180px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "24px",
    color: "white",
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    fontWeight: "bold",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(135deg, #0f172a, #1e293b, #312e81)",
        color: "white",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "50px",
        }}
      >
        <h1
          style={{
            fontSize: "52px",
            marginBottom: "10px",
          }}
        >
          Kalakshepa
        </h1>

        <h2
          style={{
            color: "#cbd5e1",
            fontWeight: "400",
          }}
        >
          Welcome, {user?.fullName || user?.firstName}
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        <Link to="/chat" style={cardStyle}>
          <div style={{ fontSize: "60px" }}>💬</div>
          Chat Room
        </Link>

        <Link to="/chess" style={cardStyle}>
          <div style={{ fontSize: "60px" }}>♟️</div>
          Chess Game
        </Link>

        <Link to="/library" style={cardStyle}>
          <div style={{ fontSize: "60px" }}>📚</div>
          E-Library
        </Link>

        <Link to="/music" style={cardStyle}>
          <div style={{ fontSize: "60px" }}>🎵</div>
          Music
        </Link>
      </div>
    </div>
  );
}