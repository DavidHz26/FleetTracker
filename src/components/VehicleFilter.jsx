import { Box, Stack, Button, Tooltip } from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FormField from "./FormField";
import FormSelect from "./FormSelect";
import { FILTER_OPTIONS } from "../utils/constants";

export default function VehicleFilter({
    label,
    options,
    searchText,
    setSearchText,
    statusFilter,
    setStatusFilter,
    onClear
}) {
    const isFiltered = searchText != "" || statusFilter != FILTER_OPTIONS.ALL;

    return (
        <Box
            component="section"
            role="search"
            aria-label="Vehicle filters"
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                mb: 4
            }}
        >
            <Box
                sx={{
                    width: 520,
                    maxWidth: "95vw",
                }}
            >
                <Stack
                    direction={{
                        xs: "column",
                        sm: "row"
                    }}
                    spacing={2}
                    sx={{
                        backgroundColor: "white",
                        padding: 2,
                        borderRadius: 3,
                        boxShadow: (theme) => theme.shadows[1],
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
                        sx={{ flex: 1.2, minWidth: 140 }}
                    />

                    <Tooltip title={isFiltered ? "Clear Filters" : "No filters applied"}>
                        <Box
                            component="span"
                            sx={{
                                display: "inline-block"
                            }}
                        >
                            <Button
                                aria-label="Clear all search filters"
                                variant="contained"
                                color={isFiltered ? "error" : "inherit"}
                                onClick={onClear}
                                disabled={!isFiltered}
                                sx={{
                                    minWidth: "56px",
                                    height: "56px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <RestartAltIcon aria-hidden="true"/>
                            </Button>
                        </Box>
                    </Tooltip>
                </Stack>
            </Box>
        </Box>
    );
}
