import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomeButton({ to = "/", text = "Back to Home", ...props }) {
  
    return (
        <Box
            sx={{
                position: "fixed",
                top: 20,
                right: 20,
                zIndex: 9999
            }}
        >
            <Button
                variant="outlined"
                color="primary"
                component={Link}
                to={to}
                {...props}
            >
                {text}
            </Button>
        </Box>
    );
}
