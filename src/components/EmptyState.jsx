import { Box, Typography } from "@mui/material";
import SearchOffIcon from '@mui/icons-material/SearchOff';

export default function EmptyState({ message = "No results found" }) {
    return (
        <Box
            role="status"
            aria-live="polite"
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                width: '100%',
                backgroundColor: 'white',
                borderRadius: 2,
                padding: 4
            }}
        >
            <SearchOffIcon
                aria-hidden="true"
                sx={{
                    fontSize: 80,
                    color: 'action.disabled',
                    mb: 2
                }}
            />
            
            <Typography
                variant="h6"
                component="p"
                color="text.secondary"
            >
                {message}
            </Typography>
        </Box>
    );
};
