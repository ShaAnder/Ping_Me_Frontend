import useWebSocket from "react-use-websocket";
import { SOCKET_URL } from "../api/config";
import { useState } from "react";

const Server = () => {
  const [newMessage, setNewMessage] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const { sendJsonMessage } = useWebSocket(SOCKET_URL, {
    onOpen: () => console.log("✅ WebSocket connected"),
    onClose: () => console.log("❌ WebSocket disconnected"),
    onError: () => console.log("⚠️ WebSocket error"),
    onMessage: (msg) => {
      try {
        const data = JSON.parse(msg.data);
        console.log("📨 Received:", data);

        if (data?.message) {
          setNewMessage((prev) => [...prev, data.message]);
        }
      } catch (err) {
        console.error("Failed to parse WS message:", err);
      }
    },
    shouldReconnect: () => true,
  });

  const handleSend = () => {
    console.log("Sending:", message);
    if (message.trim() !== "") {
      sendJsonMessage({ message });
      setMessage("");
    }
  };

  return (
    <div>
      <div>
        {newMessage.map((msg, index) => (
          <div key={index}>
            <p>{msg}</p>
          </div>
        ))}
      </div>

      <label>
        Enter Message:
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>

      <button type="button" onClick={handleSend}>
        Send Message
      </button>
    </div>
  );
};

export default Server;
