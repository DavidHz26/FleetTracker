import ModalContainer from "./ModalContainer";
import { Typography, CircularProgress, Box } from "@mui/material";

export const LoadingMessage = ({ message = "Loading..." }) => {
    return (
        <ModalContainer>
            <Box 
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
                />
                
                <Typography 
                    variant="body1" 
                    sx={{ 
                        color: 'text.secondary',
                        fontWeight: 'medium',
                        letterSpacing: 0.5
                    }}
                >
                    {message}
                </Typography>
            </Box>
        </ModalContainer>
    );
};