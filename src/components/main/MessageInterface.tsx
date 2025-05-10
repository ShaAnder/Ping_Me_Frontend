import useWebSocket from "react-use-websocket";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useCrud from "../../hooks/useFetchCRUDData";
import { ServerInterface } from "../../@types/server.d";
import { Box, Typography } from "@mui/material";

interface ServerChannelProps {
  data: ServerInterface[];
}

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

const MessageInterface = (props: ServerChannelProps) => {
  const { data } = props;
  const [newMessage, setNewMessage] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const server_name = data[0]?.name ?? "Server";
  const { serverId, channelId } = useParams();
  const { fetchData } = useCrud<ServerInterface>(
    [],
    `/messages/?channel_id=${channelId}`
  );

  const socketURL = channelId
    ? `wss://ping-me-pp5-backend-6aaeef173b97.herokuapp.com/${serverId}/${channelId}`
    : null;

  const { sendJsonMessage } = useWebSocket(socketURL, {
    onOpen: async () => {
      try {
        console.log("✅ WebSocket connected");
        const data = await fetchData();
        setNewMessage([]);
        setNewMessage(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
      }
    },
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

  // Clear out old messages when we join a new channel
  useEffect(() => {
    setNewMessage([]);
  }, [channelId]);

  return (
    <>
      {channelId == undefined ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            p: 0,
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            letterSpacing="-0.5px"
            align="center" // ⇦ center the text itself
            sx={{ px: 5, maxWidth: 600 }}
          >
            Welcome to {server_name}
          </Typography>

          <Typography align="center" sx={{ mt: 2 }}>
            {data?.[0]?.description ?? "This is our home"}
          </Typography>
        </Box>
      ) : (
        <div>
          <div>
            {newMessage.map((msg: Message, index: number) => (
              <div key={index}>
                <p>{msg.sender}</p>
                <p>{msg.timestamp}</p>
                <p>{msg.content}</p>
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
      )}
    </>
  );
};

export default MessageInterface;
