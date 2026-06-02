import {
SignedIn,
SignedOut,
SignIn,
UserButton,
} from "@clerk/clerk-react";

import {
BrowserRouter,
Routes,
Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ChatRoom from "./pages/ChatRoom";
import ChessGame from "./pages/ChessGame";
import ELibrary from "./pages/ELibrary";
import Music from "./pages/Music";
import Feedback from "./pages/Feedback";

function App() {
return (
<> <SignedOut>
<div
style={{
minHeight: "100vh",
display: "flex",
justifyContent: "center",
alignItems: "center",
background: "#0f172a",
}}
> <SignIn /> </div> </SignedOut>

  <SignedIn>
    <BrowserRouter>
      <div
        style={{
          background: "#111827",
          padding: "10px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <UserButton />
      </div>

      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/chat"
          element={<ChatRoom />}
        />

        <Route
          path="/chess"
          element={<ChessGame />}
        />

        <Route
          path="/library"
          element={<ELibrary />}
        />

        <Route
          path="/music"
          element={<Music />}
        />

        <Route
  path="/feedback"
  element={<Feedback />}
/>

      </Routes>
    </BrowserRouter>
  </SignedIn>
</>


);
}

export default App;
