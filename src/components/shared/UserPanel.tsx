// UserPanel.tsx
import React, { useState, useRef } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme } from "@mui/material/styles";
import UserCard from "./UserCard"; // import your UserCard component

const UserPanel: React.FC = () => {
  const theme = useTheme();
  const { user, logout } = useUserAuth();
  const [cardOpen, setCardOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  if (!user) return null;

  // Panel width calculation as before
  const panelWidth = `calc(${theme.serverList.width}px + ${theme.primaryDraw.width}px - 1px)`;

  return (
    <>
      <Box
        ref={anchorRef}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: panelWidth,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "background.paper",
          borderTop: "1px solid",
          borderColor: "divider",
          p: 1,
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            ml: 1,
            cursor: "pointer",
          }}
          onClick={() => setCardOpen(true)}
        >
          <Avatar src={user.avatar || undefined} alt={user.username} />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {user.username}
          </Typography>
        </Box>
        <IconButton onClick={logout} size="small" sx={{ p: 0 }}>
          <LogoutIcon />
        </IconButton>
      </Box>
      <UserCard
        open={cardOpen}
        anchorEl={anchorRef.current}
        onClose={() => setCardOpen(false)}
        user={user}
      />
    </>
  );
};

export default UserPanel;
