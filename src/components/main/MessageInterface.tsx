import useWebSocket from "react-use-websocket";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useCrud from "../../hooks/useFetchCRUDData";
import { ServerInterface } from "../../@types/server.d";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  useTheme,
  TextField,
} from "@mui/material";

import MessageInterfaceChannels from "./MessageInterfaceChannels";

import MainScroll from "./MainScroll";

interface SendMessageData {
  type: string;
  message: string;
  [key: string]: unknown;
}

interface ServerChannelProps {
  data: ServerInterface[];
}

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

const MessageInterface = (props: ServerChannelProps) => {
  const theme = useTheme();
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendJsonMessage({
        type: "message",
        message,
      } as SendMessageData);
      setMessage("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendJsonMessage({
      type: "message",
      message,
    } as SendMessageData);
  };

  return (
    <>
      <MessageInterfaceChannels data={data} />
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
        <>
          <Box sx={{ overflow: "hidden", p: 0, height: `calc(100vh - 98px)` }}>
            <MainScroll>
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {newMessage.map((msg: Message, index: number) => {
                  return (
                    <ListItem key={index} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt="userImg" />
                      </ListItemAvatar>
                      <ListItemText
                        primaryTypographyProps={{
                          fontSize: "12px",
                          variant: "body2",
                        }}
                        primary={
                          <Typography
                            component="span"
                            variant="body1"
                            color="text.primary"
                            sx={{ display: "inline", fontWeight: "600" }}
                          >
                            {msg.sender}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography
                              component="div"
                              variant="body1"
                              style={{
                                overflow: "visible",
                                whiteSpace: "normal",
                                textOverflow: "clip",
                              }}
                              sx={{
                                display: "inline",
                                lineHeight: 1.2,
                                fontWeight: "400",
                                letterSpacing: "-0.2px",
                              }}
                              color="text.primary"
                            >
                              {msg.content}
                            </Typography>
                          </Box>
                        }
                        secondaryTypographyProps={{ component: "span" }}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </MainScroll>
          </Box>
          <Box sx={{ position: "sticky", bottom: 0, width: "100%" }}>
            <form
              onSubmit={handleSubmit}
              style={{
                bottom: 0,
                right: 0,
                padding: "1rem",
                backgroundColor: theme.palette.background.default,
                zIndex: 1,
              }}
            >
              <Box sx={{ display: "flex" }}>
                <TextField
                  fullWidth
                  multiline
                  minRows={1}
                  maxRows={4}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setMessage(e.target.value)}
                  sx={{ flexGrow: 1 }}
                  value={message}
                />
              </Box>
            </form>
          </Box>
        </>
      )}
    </>
  );
};

export default MessageInterface;
