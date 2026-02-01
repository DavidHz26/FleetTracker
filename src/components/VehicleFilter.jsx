import { Box, Stack } from "@mui/material";
import FormField from "./FormField";
import FormSelect from "./FormSelect";
import { useTransition } from "react";

export default function VehicleFilter({label, options, searchText, setSearchText, statusFilter, setStatusFilter}) {

    const [isPending, startTransition] = useTransition();

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    width: 520,
                    maxWidth: "90vw",
                }}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        width: "100%",
                        backgroundColor: "white",
                        padding: 2,
                        borderRadius: 3,
                        alignItems: "center"
                    }}
                >
                    <FormField
                        label={label}
                        value={searchText}
                        onChange={e => {
                            const value = e.target.value;
                            startTransition(() => {
                                setSearchText(value);
                            })
                        }}
                        placeholder="Enter text..."
                        sx={{ flex: 1 }}
                    />

                    <FormSelect
                        label="Filter by status"
                        value={statusFilter}
                        onChange={setStatusFilter}
                        options={options}
                        sx={{ minWidth: 180 }}
                    />
                </Stack>
            </Box>
        </Box>
    );
}
