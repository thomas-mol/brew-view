import { createContext, ReactNode, useContext, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

interface AlertContextType {
  showAlert: (
    message: string,
    position: {
      vertical: "top" | "bottom";
      horizontal: "left" | "center" | "right";
    },
    type?: "success" | "error" | "info" | "warning"
  ) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    position: {
      vertical: "top" | "bottom";
      horizontal: "left" | "center" | "right";
    };
    type: "success" | "error" | "info" | "warning";
  }>({
    message: "",
    position: {
      vertical: "top",
      horizontal: "left",
    },
    type: "success",
  });

  const showAlert = (
    message: string,
    position: {
      vertical: "top" | "bottom";
      horizontal: "left" | "center" | "right";
    },
    type: "success" | "error" | "info" | "warning" = "info"
  ) => {
    setOpen(true);
    setAlert({ message, position, type });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={2_500}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: alert.position.vertical,
          horizontal: alert.position.horizontal,
        }}
      >
        <Alert severity={alert.type} variant="filled">
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context)
    throw new Error("useAlert must be used within an AlertProvider");
  return context;
};
