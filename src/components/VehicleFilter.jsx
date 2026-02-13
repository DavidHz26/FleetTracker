import { Box, Stack } from "@mui/material";
import FormField from "./FormField";
import FormSelect from "./FormSelect";

export default function VehicleFilter({label, options, searchText, setSearchText, statusFilter, setStatusFilter}) {

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                mb: 3
            }}
        >
            <Box
                sx={{
                    width: 520,
                    maxWidth: "95vw",
                }}
            >
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    sx={{
                        backgroundColor: "white",
                        padding: 2,
                        borderRadius: 3,
                        boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
                        alignItems: "flex-end"
                    }}
                >
                    <FormField
                        id="search_filter"
                        label={label}
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        placeholder="Search by plate or brand..."
                        sx={{ flex: 2 }}
                    />

                    <FormSelect
                        id="status_filter"
                        label="Status"
                        value={statusFilter}
                        onChange={setStatusFilter}
                        options={options}
                        sx={{ flex: 1, minWidth: 150 }}
                    />
                </Stack>
            </Box>
        </Box>
    );
}
