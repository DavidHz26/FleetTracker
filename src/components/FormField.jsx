import { TextField, Typography, Stack } from "@mui/material";

export default function FormField({
    id,
    label,
    type = "text",
    value,
    onChange,
    placeholder="",
    ...props
}) {
    return (
        <Stack
            spacing={1}
            width={"100%"}
        >
            <TextField
                id={id}
                name={id}
                label={label}
                value={value}
                type={type}
                onChange={onChange}
                placeholder={placeholder}
                fullWidth
                {...props}
            />
        </Stack>
    )
}
