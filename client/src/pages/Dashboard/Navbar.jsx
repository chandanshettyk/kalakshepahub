import { UserButton, useUser } from "@clerk/clerk-react";

export default function Navbar() {
  const { user } = useUser();

  return (
    <div className="navbar">
      <div className="navbar-left">
        <h1>
          Welcome back, {user?.firstName || "Chandu"} 👋
        </h1>

        <p>
          Explore chat, games, music and library.
        </p>
      </div>

      <div className="navbar-right">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}