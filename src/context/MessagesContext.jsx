import { createContext, useCallback, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const MessagesContext = createContext(null);

export function MessagesProvider ({ children }) {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const showMessage = useCallback((message, severity = "error") => {
        setSnackbar(prev => ({ ...prev, open: false }));

        setTimeout(() => {
            setSnackbar({
                open: true,
                message,
                severity
            });
        }, 150);
    }, []);

    const handleClose = useCallback((_, reason) => {
        if (reason === "clickaway"){
            return;
        }
        setSnackbar(prev => ({ ...prev, open: false }));
    }, []);


    return (
        <MessagesContext.Provider value={{ showMessage }}>
            {children}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
            >
                <Alert
                    onClose={handleClose}
                    severity={snackbar.severity}
                    variant="filled"
                    role="alert"
                    elevation={6}
                    sx={{
                        width: "100%",
                        borderRadius: 2
                    }}
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
       throw new Error("useMessages must be used inside MessagesProvider");
    }
    return context;
}
