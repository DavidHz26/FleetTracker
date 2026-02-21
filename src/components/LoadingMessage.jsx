import CenteredLayout from "./CenteredLayout";
import { Typography, CircularProgress, Box } from "@mui/material";

export const LoadingMessage = ({ message = "Loading..." }) => {
    return (
        <CenteredLayout>
            <Box 
                role="alert"
                aria-busy="true"
                aria-live="polite"
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 3,
                    minWidth: 200,
                    p: 2
                }}
            >
                <CircularProgress 
                    size={60} 
                    thickness={4.5} 
                    sx={{ color: 'primary.main' }}
                    aria-hidden="true"
                />
                
                <Typography 
                    variant="body1"
                    component="p"
                    sx={{ 
                        color: 'text.secondary',
                        fontWeight: 'medium',
                        letterSpacing: 0.5
                    }}
                >
                    {message}
                </Typography>
            </Box>
        </CenteredLayout>
    );
};
