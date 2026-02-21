import { FormControl, InputLabel, Select, MenuItem, Stack } from "@mui/material";

export default function FormSelect({ id, label, value, onChange, options, ...props }) {
    const optionValues = Array.isArray(options) ? options : Object.values(options);
    const labelId = `${id}-label`;

    return (
        <Stack
            spacing={1}
            width={"100%"}
        >
            <FormControl fullWidth>
                <InputLabel id={labelId}>{label}</InputLabel>

                <Select
                    id={id}
                    labelId={labelId}
                    value={value}
                    label={label}
                    onChange={e => onChange(e.target.value)}
                    inputProps={{ name: id }}
                    {...props}
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
