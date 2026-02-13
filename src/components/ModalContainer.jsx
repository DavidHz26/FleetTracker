import { Box } from "@mui/material";

export default function ModalContainer({ children }) {
  return (
    <Box
        sx={{
            minHeight: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
        }}
    >
        <Box
            sx={{
                width: "100%",
                maxWidth: "600px",
                maxHeight: "90vh",
                backgroundColor: "white",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)", // Sombra suave para que parezca una tarjeta
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
