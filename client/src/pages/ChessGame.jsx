import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { socket } from "../socket";
import { useUser } from "@clerk/clerk-react";

export default function ChessGame() {
    const { user } = useUser();
    
  const [game, setGame] = useState(new Chess());
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);

  const createRoom = () => {
    const code = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

    setRoom(code);
  };

  const joinRoom = () => {
    if (!room) {
      alert("Enter Room Code");
      return;
    }

    socket.emit("join_chess_room", room);
    setJoined(true);
  };

  const onDrop = (sourceSquare, targetSquare) => {
    const gameCopy = new Chess(game.fen());

    try {
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      if (!move) return false;

      setGame(gameCopy);

      socket.emit("move_piece", {
        room,
        fen: gameCopy.fen(),
      });

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    socket.on("receive_move", (fen) => {
      setGame(new Chess(fen));
    });

    return () => {
      socket.off("receive_move");
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "20px",
      }}
    >
      <h1>♟ Multiplayer Chess</h1>

      {!joined ? (
        <>
          <button onClick={createRoom}>
            Create Chess Room
          </button>

          <br />
          <br />

          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value.toUpperCase())}
            placeholder="Enter Room Code"
            style={{
              padding: "10px",
              width: "250px",
            }}
          />

          <br />
          <br />

          <button onClick={joinRoom}>
            Join Room
          </button>

          {room && (
            <p>
              Room Code: <strong>{room}</strong>
            </p>
          )}
        </>
      ) : (
        <>
          <h2>Room: {room}</h2>

          <div style={{ width: "600px", maxWidth: "100%" }}>
            <Chessboard
              position={game.fen()}
              onPieceDrop={onDrop}
            />
          </div>
        </>
      )}
    </div>
  );
}