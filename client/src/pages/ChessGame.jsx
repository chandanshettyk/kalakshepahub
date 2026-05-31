import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { socket } from "../socket";
import { useUser } from "@clerk/clerk-react";
import "./ChessGame.css";

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
  <div className="chess-page">
    <h1 className="chess-title">
      ♟ Kalakshepa Chess Arena
    </h1>

    {!joined ? (
      <div className="join-card">
        <button
          className="join-btn"
          onClick={createRoom}
        >
          Create Chess Room
        </button>

        <input
          className="join-input"
          type="text"
          value={room}
          onChange={(e) =>
            setRoom(
              e.target.value.toUpperCase()
            )
          }
          placeholder="Enter Room Code"
        />

        <button
          className="join-btn"
          onClick={joinRoom}
        >
          Join Room
        </button>

        {room && (
          <p>
            Room Code:
            <strong> {room}</strong>
          </p>
        )}
      </div>
    ) : (
      <div className="chess-layout">
        <div className="chess-sidebar">
          <div className="chess-card">
            👤 {user?.firstName || "Player"}
          </div>

          <div className="chess-card">
            🎮 Room: {room}
          </div>

          <div className="chess-card">
            ♟ Multiplayer Match
          </div>
        </div>

        <div className="board-section">
          <div className="board-wrapper">
            <Chessboard
              position={game.fen()}
              onPieceDrop={onDrop}
            />
          </div>
        </div>
      </div>
    )}
  </div>
);

}