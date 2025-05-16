import plus from "../../assets/img/plus.png";
import { Link } from "react-router-dom";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Box,
  Avatar,
} from "@mui/material";

const CreateServerButton = () => {
  return (
    <>
      <ListItem disablePadding sx={{ display: "block" }} dense>
        <ListItemButton
          component={Link}
          to="/create-or-join"
          sx={{
            minHeight: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                backgroundColor: "	#36393f",
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "#5865F2",
                },
              }}
            >
              <Avatar
                alt="Add Server"
                src={plus}
                sx={{
                  width: 32,
                  height: 32,
                  filter: "invert(1) sepia(1) saturate(5) hue-rotate(180deg)",
                }}
              />
            </Box>
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default CreateServerButton;
