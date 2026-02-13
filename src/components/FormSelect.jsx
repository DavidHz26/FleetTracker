import { FormControl, Typography, Select, MenuItem, Stack } from "@mui/material";

export default function FormSelect({ id, label, value, onChange, options, ...props }) {
  
    const optionValues = Array.isArray(options) ? options : Object.values(options);

    return (
        <Stack
            spacing={1}
            width={"100%"}
        >
            <Typography
                component="label"
                id={`${id}-label`}
                htmlFor={id}
                sx={{ color: "text.primary" }}>
                {label}
            </Typography>

            <FormControl
                fullWidth
            >
                <Select
                    id={id}
                    labelId={`${id}-label`}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    {...props}
                    sx={{
                        "& .MuiSelect-select": {
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        },
                    }}
                >
                    {optionValues.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Stack>
    );
}
