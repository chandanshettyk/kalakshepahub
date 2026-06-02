import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="sidebar">
      <marquee> <h1 className="logo">
    KalakshepaHub
      </h1> </marquee>

      <Link to="/">🏠 Dashboard</Link>
      <Link to="/chat">💬 Open Chat</Link>
      <Link to="/chess">♟ Play Chess</Link>
      <Link to="/library">📚 Open Library</Link>
      <Link to="/music">🎵 Music Hub</Link>
<Link to="/feedback">⭐ Feedback</Link>
<Link to="/reviews">📝 Reviews</Link>

      <div className="sidebar-footer">
        <div className="sidebar-clock">
           {time}
        </div>
      </div>
    </div>
  );
}