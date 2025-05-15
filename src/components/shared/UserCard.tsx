import Popover from "@mui/material/Popover";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useNavigate, useLocation } from "react-router-dom";
import DarkModeSwitch from "../utils/DarkModeToggle";
import { useTheme } from "@mui/material/styles";
import { UserInterface } from "../../@types/user";

// Define the props for UserCard
interface UserCardProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  user: UserInterface;
}

const UserCard: React.FC<UserCardProps> = ({
  open,
  anchorEl,
  onClose,
  user,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const handleEditProfile = () => {
    onClose();
    navigate("/edit-profile", { state: { from: location.pathname } });
  };

  const panelWidth = `calc(${theme.serverList.width}px + ${theme.primaryDraw.width}px - 1px)`;

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorReference="anchorEl"
      PaperProps={{
        elevation: 3,
        sx: {
          minWidth: panelWidth,
          mb: 1.5,
          ml: -2,
          borderRadius: 0,
          p: 0,
        },
      }}
      transformOrigin={{ vertical: "bottom", horizontal: "left" }}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <Card sx={{ boxShadow: "none", borderRadius: 0 }}>
        <CardContent sx={{ p: 2 }}>
          {/* Avatar and Name Row */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar src={user.avatar} sx={{ width: 56, height: 56, mr: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {user.username}
            </Typography>
          </Box>
          {/* Location */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 600, display: "block", mb: 0.5 }}
            >
              Location
            </Typography>
            <Typography
              variant="body2"
              sx={{
                minHeight: "1.5em", // Ensures space even if empty
                color: user.location ? "inherit" : "text.disabled",
              }}
            >
              {user.location || ""}
            </Typography>
          </Box>
          {/* Description */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 600, display: "block", mb: 0.5 }}
            >
              Description
            </Typography>
            <Typography
              variant="body2"
              sx={{
                minHeight: "2.5em", // Ensures space even if empty
                color: user.description ? "inherit" : "text.disabled",
              }}
            >
              {user.description || ""}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        {/* Actions */}
        <Box sx={{ p: 2, pt: 1 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleEditProfile}
            sx={{
              mb: 1,
              borderRadius: 2,
              bgcolor: theme.palette.action.hover,
              borderColor: theme.palette.divider,
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                bgcolor: theme.palette.action.selected,
              },
            }}
          >
            Edit Profile
          </Button>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <DarkModeSwitch />
          </Box>
        </Box>
      </Card>
    </Popover>
  );
};

export default UserCard;
