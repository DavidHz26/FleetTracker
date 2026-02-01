import { FormControl, Typography, Select, MenuItem, Stack } from "@mui/material";

export default function FormSelect({ label, value, onChange, options }) {
  
    const optionValues = Object.values(options);

    return (
        <Stack spacing={1}>
            <FormControl
                sx={{
                    width:180,
                    flexShrink: 0,
                }}
            >
                <Typography sx={{ color: "black" }}>
                    {label}
                </Typography>

                <Select
                    value={value}
                    onChange={e => onChange(e.target.value)}
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
