import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HomeButton() {
  
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                position: "absolute",
                top: 12,
                right: 12
            }}
        >
            <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate("/")}
            >
                Back to Home
            </Button>
        </Box>
    );
}
