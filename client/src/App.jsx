import {
  SignedIn,
  SignedOut,
  SignIn,
  ClerkLoaded,
  ClerkLoading,
} from "@clerk/clerk-react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import ChatRoom from "./pages/ChatRoom";
import ChessGame from "./pages/ChessGame";
import ELibrary from "./pages/ELibrary";
import Music from "./pages/Music";
import Feedback from "./pages/Feedback";
import Reviews from "./pages/Reviews";

function App() {
  return (
    <>
      <ClerkLoading>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#0f172a",
            color: "white",
          }}
        >
          Loading...
        </div>
      </ClerkLoading>

      <ClerkLoaded>
        <SignedOut>
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#0f172a",
            }}
          >
            <SignIn />
          </div>
        </SignedOut>

        <SignedIn>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/chat" element={<ChatRoom />} />
              <Route path="/chess" element={<ChessGame />} />
              <Route path="/library" element={<ELibrary />} />
              <Route path="/music" element={<Music />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/reviews" element={<Reviews />} />
            </Routes>
          </BrowserRouter>
        </SignedIn>
      </ClerkLoaded>
    </>
  );
}

export default App;