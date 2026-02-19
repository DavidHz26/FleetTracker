import ModalContainer from "./ModalContainer";
import { Typography, Box, Button } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeButton from "./HomeButton";

export const ServerErrorMessage = ({ 
    title = "Connection Error", 
    message = "We couldn't reach the server. Please try again later.",
    onRetry = null 
}) => {
    return (
        <ModalContainer>
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    textAlign: 'center',
                    p: 3
                }}
            >
                <ErrorOutlineIcon 
                    sx={{ 
                        fontSize: 80, 
                        color: 'error.main',
                        mb: 1
                    }} 
                />
                
                <Typography 
                    variant="h5" 
                    sx={{ 
                        color: 'text.primary',
                        fontWeight: 'bold'
                    }}
                >
                    {title}
                </Typography>
                
                <Typography 
                    variant="body1" 
                    sx={{ 
                        color: 'text.secondary',
                        maxWidth: 300,
                        mb: 2
                    }}
                >
                    {message}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    {onRetry && (
                        <Button 
                            variant="contained" 
                            onClick={onRetry}
                            sx={{ px: 4 }}
                        >
                            Retry
                        </Button>
                    )}
                </Box>
            </Box>
        </ModalContainer>
    );
};