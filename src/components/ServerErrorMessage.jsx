import CenteredLayout from "./CenteredLayout";
import { Typography, Box, Button } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const ServerErrorMessage = ({ 
    title = "Connection Error", 
    message = "We couldn't reach the server. Please try again later.",
    onRetry = null 
}) => {
    return (
        <CenteredLayout>
            <Box
                role="alert"
                aria-live="assertive"
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    textAlign: 'center',
                    p: 4
                }}
            >
                <ErrorOutlineIcon
                    aria-hidden="true"
                    sx={{ 
                        fontSize: 80, 
                        color: 'error.light',
                        mb: 1
                    }} 
                />
                
                <Typography 
                    variant="h5"
                    component="h2"
                    sx={{ 
                        color: 'error.main',
                        fontWeight: 'bold'
                    }}
                >
                    {title}
                </Typography>
                
                <Typography 
                    variant="body1"
                    component="p"
                    sx={{ 
                        color: 'text.secondary',
                        maxWidth: 320,
                        mb: 1.6
                    }}
                >
                    {message}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    {onRetry && (
                        <Button
                            aria-label="Retry connection"
                            variant="contained"
                            color="primary"
                            onClick={onRetry}
                            sx={{ 
                                mt: 2,
                                px: 6,
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 'bold'
                            }}
                        >
                            Retry
                        </Button>
                    )}
                </Box>
            </Box>
        </CenteredLayout>
    );
};