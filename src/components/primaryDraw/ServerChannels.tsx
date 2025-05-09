import { List, ListItem, ListItemButton, Box, useTheme } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { ServerInterface } from "../../@types/server";

interface ServerChannelProps {
  data: ServerInterface[];
}

const ServerChannel = (props: ServerChannelProps) => {
  const { data } = props;
  const theme = useTheme();
  const { serverId } = useParams();

  console.log(data);

  return (
    <>
      <Box
        sx={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // Centers content horizontally
          p: 1,
          fontSize: 16,
          letterSpacing: 1,
          fontFamily: "verdana",
          borderBottom: `1px solid ${theme.palette.divider}`,
          position: "sticky",
          top: 0,
          backgroundColor: theme.palette.background.default,
          mb: 1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          textAlign: "center", // Ensures text inside is centered
        }}
      >
        {data[0]?.name.length > 20
          ? `${data[0]?.name.slice(0, 20)}...`
          : data[0]?.name}
      </Box>
      <List sx={{ py: 0 }}>
        {data.flatMap((obj) =>
          obj.channel_server.map((item) => (
            <ListItem
              disablePadding
              key={item.id}
              sx={{ display: "block" }}
              dense={true}
            >
              <Link
                to={`/server/${serverId}/${item.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemButton sx={{ minHeight: 48, fontFamily: "verdana" }}>
                  {item.type === "text" ? (
                    <>#️ {item.name}</>
                  ) : (
                    <>🔊 {item.name}</>
                  )}
                </ListItemButton>
              </Link>
            </ListItem>
          ))
        )}
      </List>
    </>
  );
};

export default ServerChannel;
