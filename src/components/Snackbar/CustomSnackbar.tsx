import { Snackbar, SnackbarCloseReason } from "@mui/material";
import { SyntheticEvent } from "react";

interface Props {
  open: boolean;
  handleClose: (
    _event: SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => void;
  message: string;
}

const CustomSnackbar = ({ open, handleClose, message }: Props) => {
  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      autoHideDuration={2500}
      onClose={handleClose}
      open={open}
      message={message}
      sx={{ bottom: 80 }}
    />
  );
};

export default CustomSnackbar;
