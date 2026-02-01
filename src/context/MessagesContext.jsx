import { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const MessagesContext = createContext(null);

export function MessagesProvider ({ children }) {

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const showMessage = (message, severity = "error") => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    
    const handleClose = (_, reason) => {
        if (reason === "clickaway"){
            return;
        }
        setSnackbar(prev => ({ ...prev, open: false }));
    }


    return (
        <MessagesContext.Provider value={{ showMessage }}>
            {children}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
            >
                <Alert
                    onClose={handleClose}
                    severity={snackbar.severity}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </MessagesContext.Provider>
    )
}

export function useMessages() {
    const context = useContext(MessagesContext);
    if(!context){
        console.error("useMessages must be used inside MessagesProvider");
    }
    return context;
}
