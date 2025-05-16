import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogProps,
  useTheme,
} from "@mui/material";

export interface ModalProps extends Omit<DialogProps, "title"> {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  actions,
  ...dialogProps
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRadius: 3,
          boxShadow: 12,
        },
      }}
      {...dialogProps}
    >
      {title && (
        <DialogTitle
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 700,
            letterSpacing: 1,
            pb: 1,
          }}
        >
          {title}
        </DialogTitle>
      )}
      <DialogContent sx={{ pb: 2 }}>{children}</DialogContent>
      {actions && (
        <DialogActions
          sx={{
            justifyContent: "flex-end",
            pr: 3,
            pb: 3,
            pt: 0,
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;
