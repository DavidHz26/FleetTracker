import { TextField, Typography, Stack } from "@mui/material";

export default function FormField({id, label, type = "text", value, onChange, placeholder="", ...props}) {
    
    return (
        <Stack
            spacing={1}
            width={"100%"}
        >
            <Typography
                component="label"
                htmlFor={id}
                sx={{ color: "text.primary" }}
            >
                {label}
            </Typography>

            <TextField
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                fullWidth
                {...props}
            />
        </Stack>
    )
}
