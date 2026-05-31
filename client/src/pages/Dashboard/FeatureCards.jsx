import { Link } from "react-router-dom";

const cards = [
  { icon: "💬", title: "Open Chat", path: "/chat" },
  { icon: "♟", title: "Play Chess", path: "/chess" },
  { icon: "📚", title: "Library Hub", path: "/library" },
  { icon: "🎵", title: "Music Hub", path: "/music" },
];

export default function FeatureCards() {
  return (
    <div className="feature-grid">
      {cards.map((card, index) => (
        <Link
          key={index}
          to={card.path}
          className="feature-card"
        >
          <h1>{card.icon}</h1>
          <h3>{card.title}</h3>
        </Link>
      ))}
    </div>
  );
}