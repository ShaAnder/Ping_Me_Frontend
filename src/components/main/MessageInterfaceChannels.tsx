import {
  AppBar,
  Toolbar,
  Box,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
  Drawer,
  useTheme,
  List,
} from "@mui/material";
import { ServerInterface } from "../../@types/server";
import { useParams } from "react-router-dom";
import ServerChannel from "../primaryDraw/ServerChannels";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVertIcon";

interface ServerChannelProps {
  data: ServerInterface[];
}

const MessageInterfaceChannels = (props: ServerChannelProps) => {
  const theme = useTheme();
  const { data } = props;
  const { serverId, channelId } = useParams();
  const channelName =
    data
      ?.find((server) => server.id == Number(serverId))
      ?.channel_server?.find((channel) => channel.id === Number(channelId))
      ?.name || "home";

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: theme.palette.background.default,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
        color="default"
        position="sticky"
        elevation={0}
      >
        <Toolbar
          variant="dense"
          sx={{
            minHeight: "49px",
            height: "49px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography noWrap component="div">
            # {channelName}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default MessageInterfaceChannels;
