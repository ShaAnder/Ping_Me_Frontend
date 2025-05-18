import { useState } from "react";
import { IconButton, Tooltip, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import axios from "axios";
import { BASE_URL } from "../../api/config";
import { useUserServers } from "../../hooks/useUserServers";
import { useNavigate } from "react-router-dom";

interface LeaveServerButtonProps {
  serverId: number;
  onLeft?: () => void;
}

const LeaveServerButton: React.FC<LeaveServerButtonProps> = ({
  serverId,
  onLeft,
}) => {
  const [leaving, setLeaving] = useState(false);
  const { refresh: refreshUserServers } = useUserServers();
  const navigate = useNavigate();

  const handleLeaveServer = async () => {
    setLeaving(true);
    const token = localStorage.getItem("access_token");
    try {
      await axios.post(
        `${BASE_URL}/api/servers/${serverId}/remove_member/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await refreshUserServers();
      if (onLeft) onLeft();
      navigate("/");
    } catch (err) {
      console.log(err);
      setLeaving(false);
    }
  };

  return (
    <Tooltip title="Leave Server">
      <IconButton
        onClick={handleLeaveServer}
        disabled={leaving}
        sx={{
          bgcolor: "transparent",
          "&:hover": { bgcolor: "transparent" },
          color: "error.main",
        }}
        aria-label="Leave Server"
      >
        <Typography>Leave Server</Typography>
        <ExitToAppIcon sx={{ pl: 1 }} fontSize="medium" />
      </IconButton>
    </Tooltip>
  );
};

export default LeaveServerButton;
