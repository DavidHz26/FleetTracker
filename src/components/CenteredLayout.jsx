import { Box } from "@mui/material";
import HomeButton from "./HomeButton";

export default function CenteredLayout({ children, showHomeButton = false }) {
  return (
    <Box
        component="main"
        sx={{
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            flexDirection:"column",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            position: "fixed",
            top: 0,
        }}
    >
        {showHomeButton && (
            <HomeButton/>
        )}
    
        <Box
            component="section"
            sx={{
                width: "100%",
                maxWidth: "600px",
                maxHeight: "90vh",
                backgroundColor: "white",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    padding: 3,
                }}
            >
                {children}
            </Box>
        </Box>
    </Box>
  );
}
