import { Box } from "@mui/material";

export default function ModalContainer({ children }) {
  return (
    <Box
        sx={{
            position: "fixed",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <Box
            sx={{
                width: "600px",
                maxHeight: "90vh",
                backgroundColor: "white",
                borderRadius: 2,
                display: "flex",
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
