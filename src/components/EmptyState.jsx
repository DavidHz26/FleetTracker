import { Box, Typography } from "@mui/material";
import SearchOffIcon from '@mui/icons-material/SearchOff';

export default function EmptyState({ message = "No results found" }) {
    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                py: 10,
                width: '100%',
                opacity: 0.8,
                backgroundColor: 'white',
                borderRadius: 2,
                padding: 4
            }}
        >
            <SearchOffIcon
                sx={{
                    fontSize: 80,
                    color: 'action.disabled',
                    mb: 2
                }}
            />
            
            <Typography
                variant="h6"
                color="text.secondary"
            >
                {message}
            </Typography>
        </Box>
    );
};
