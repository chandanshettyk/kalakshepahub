import {
ClerkLoaded,
ClerkLoading,
SignedIn,
SignedOut,
SignIn,
UserButton,
} from "@clerk/clerk-react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ChatRoom from "./pages/ChatRoom";
import ChessGame from "./pages/ChessGame";
import Elibrary from "./pages/Elibrary";
import Music from "./pages/Music";

function App() {
return (
<> <ClerkLoading>
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
Loading... </div> </ClerkLoading>

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
        <div
          style={{
            padding: "10px",
            background: "#111827",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <UserButton afterSignOutUrl="/" />
        </div>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chat" element={<ChatRoom />} />
          <Route path="/chess" element={<ChessGame />} />
          <Route path="/library" element={<Elibrary />} />
          <Route path="/music" element={<Music />} />
        </Routes>
      </BrowserRouter>
    </SignedIn>
  </ClerkLoaded>
</>


);
}

export default App;
