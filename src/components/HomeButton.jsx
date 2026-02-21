import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomeButton({ to = "/", text = "Back to Home", ...props }) {
    return (
        <Box
            component="nav"
            aria-label="Home navigation"
            sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                maxWidth: "600px",
                mb: 2,
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
