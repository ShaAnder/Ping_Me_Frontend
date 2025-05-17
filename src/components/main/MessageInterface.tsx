import useWebSocket from "react-use-websocket";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useServerContext } from "../../hooks/useServerContext";
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
  CircularProgress,
} from "@mui/material";
import MessageInterfaceChannels from "./MessageInterfaceChannels";
import MainScroll from "./MainScroll";

import { MessageTypeInterface } from "../../@types/message";

export interface MessageInterfaceProps {
  server: ServerInterface | null;
}

const MessageInterface = ({ server }: MessageInterfaceProps) => {
  const theme = useTheme();
  const { serverId, channelId } = useParams();
  const { fetchMessagesForChannel, messagesByChannel, loadingMessages } =
    useServerContext();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageTypeInterface[]>([]);

  // Fetch messages when channel changes
  useEffect(() => {
    if (channelId) {
      // Fetch messages from context or API
      fetchMessagesForChannel(channelId);
    }
  }, [channelId, fetchMessagesForChannel]);

  // Update local state when context messages change
  useEffect(() => {
    if (channelId && messagesByChannel[channelId]) {
      setMessages(messagesByChannel[channelId]);
    }
  }, [channelId, messagesByChannel]);

  // WebSocket for real-time messages
  const socketURL = channelId
    ? `wss://ping-me-pp5-backend-6aaeef173b97.herokuapp.com/${serverId}/${channelId}`
    : null;

  useWebSocket(socketURL, {
    onMessage: (msg) => {
      try {
        const data = JSON.parse(msg.data);
        if (data?.message) {
          setMessages((prev) => [...prev, data.message]);
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
      // sendJsonMessage logic here (add sendJsonMessage from useWebSocket if needed)
      setMessage("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // sendJsonMessage logic here (add sendJsonMessage from useWebSocket if needed)
    setMessage("");
  };

  const formatTimeStamp = (timestamp: string) => {
    const date = new Date(Date.parse(timestamp));
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return [formattedTime, formattedDate];
  };

  if (!server) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">No server data available.</Typography>
      </Box>
    );
  }

  const server_name = server.name ?? "Server";
  const server_description = server.description ?? "This is our home";

  return (
    <>
      <MessageInterfaceChannels data={[server]} />
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
            align="center"
            sx={{ px: 5, maxWidth: 600 }}
          >
            Welcome to {server_name}
          </Typography>
          <Typography align="center" sx={{ mt: 2 }}>
            {server_description}
          </Typography>
        </Box>
      ) : loadingMessages ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ overflow: "hidden", p: 0, height: `calc(100vh - 98px)` }}>
            <MainScroll>
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {messages.map((msg: MessageTypeInterface, index: number) => (
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
                        <>
                          <Typography
                            component="span"
                            variant="body1"
                            color="text.primary"
                            sx={{ display: "inline", fontWeight: "600" }}
                          >
                            {msg.sender}
                          </Typography>
                          <Typography
                            component="span"
                            variant="caption"
                            color="textSecondary"
                            sx={{
                              paddingLeft: 3,
                              fontSize: 10,
                            }}
                          >
                            {`${
                              formatTimeStamp(msg?.timestamp_created)[0]
                            }   |   ${
                              formatTimeStamp(msg?.timestamp_created)[1]
                            }`}
                          </Typography>
                        </>
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
                ))}
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
