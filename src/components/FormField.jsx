import { TextField, Typography, Stack } from "@mui/material";

export default function FormField({label, value, onChange, placeholder=""}) {
    
    return (
        <Stack
            spacing={1}
            width={"100%"}
        >
            <Typography sx={{ color: "black" }}>
                {label}
            </Typography>

            <TextField
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                fullWidth
            />
        </Stack>
    )
}
