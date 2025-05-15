import { Typography } from "@mui/material";
import React from "react";

const AuthHeader: React.FC<{ title: string }> = ({ title }) => (
  <>
    <Typography
      variant="h4"
      sx={{
        mb: 3,
        fontWeight: 900,
        letterSpacing: 1,
        textAlign: "center",
      }}
    >
      PingMe
    </Typography>
    <Typography
      variant="h5"
      sx={{
        mb: 2,
        fontWeight: 700,
        textAlign: "left",
      }}
    >
      {title}
    </Typography>
  </>
);

export default AuthHeader;
