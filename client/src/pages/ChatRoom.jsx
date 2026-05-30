import { useState, useEffect } from "react";
import { socket } from "../socket";
import { useUser } from "@clerk/clerk-react";
import "./ChatRoom.css";

export default function ChatRoom() {
const { user } = useUser();

const [username, setUsername] = useState("");
const [room, setRoom] = useState("");
const [joined, setJoined] = useState(false);

const [message, setMessage] = useState("");
const [messages, setMessages] = useState([]);

useEffect(() => {
if (user) {
setUsername(
user.firstName ||
user.fullName ||
"User"
);
}
}, [user]);

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


socket.emit("join_room", room);
setJoined(true);


};

const sendMessage = () => {
if (!message.trim()) return;


const messageData = {
  room,
  author: username,
  message,
  time: new Date().toLocaleTimeString(),
};

socket.emit("send_message", messageData);

setMessage("");


};

useEffect(() => {
socket.off("receive_message");


socket.on("receive_message", (data) => {
  setMessages((prev) => [...prev, data]);
});

return () => {
  socket.off("receive_message");
};


}, []);

return (
<>
{!joined ? ( <div className="join-container"> <div className="join-card"> <h1 className="join-title">
💬 Kalakshepa Chat </h1>


        <button
          className="join-btn"
          onClick={createRoom}
        >
          Create Room
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
          <p
            style={{
              marginTop: "15px",
            }}
          >
            Room Code:
            <strong> {room}</strong>
          </p>
        )}
      </div>
    </div>
  ) : (
    <div className="chat-container">
      <div className="sidebar">
        <div className="sidebar-title">
          Kalakshepa
        </div>

        <div className="room-box">
          # {room}
        </div>

        <div className="user-box">
          👤 {username}
        </div>
      </div>

      <div className="chat-main">
        <div className="chat-header">
          💬 Room: {room}
        </div>

        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="message"
            >
              <div>
                <span className="message-author">
                  {msg.author}
                </span>

                <span className="message-time">
                  {msg.time}
                </span>
              </div>

              <div className="message-text">
                {msg.message}
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input-container">
          <div className="chat-input-box">
            <input
              className="chat-input"
              type="text"
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              placeholder={`Message #${room}`}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button
              className="send-btn"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
</>


);
}
