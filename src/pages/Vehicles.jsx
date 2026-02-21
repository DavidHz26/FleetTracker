import { Button, Box, Typography} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { VehiclesList } from "../components/VehiclesList";
import { useGetVehicles } from "../hooks/useGetVehicles";
import { FILTER_OPTIONS } from "../utils/constants";
import { useDebounce } from "../hooks/useDebounce";
import { LoadingMessage } from "../components/LoadingMessage";
import { ServerErrorMessage } from "../components/ServerErrorMessage";

export default function Vehicles() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState(FILTER_OPTIONS.ALL);

    const debouncedSearch = useDebounce(searchText, 500);

    const handleSearchChange = (value) => {
        setCurrentPage(1);
        setSearchText(value);
    }

    const handleStatusChange = (value) => {
        setCurrentPage(1);
        setStatusFilter(value);
    }

    const handleClearFilters = () => {
        setCurrentPage(1);
        setSearchText("");
        setStatusFilter(FILTER_OPTIONS.ALL);
    }

    const { data, error, isLoading, refetch } = useGetVehicles({
        page: currentPage,
        search: debouncedSearch,
        status: statusFilter
    });

    const vehicles = data?.vehicles || [];
    const totalPages = data?.totalPages || 0;

    return (
        <Box
            component="main"
            sx={{
                minHeight: "100vh",
                width: "100vw",
                display: "flex",
                flexDirection: "column",
                margin: 0,
                padding: 0,
                boxSizing: "border-box",
                overflowX: "hidden"
            }}
        >
            <Box
                component="header"
                sx={{
                    padding: { xs: 2, md: 4 },
                    boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    backgroundColor: "gray"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        maxWidth: 1200,
                        margin: "0 auto",
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{ fontWeight: "bold" }}
                    >
                        Fleet Tracker
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        component={Link}
                        to="/vehicles/new"
                        aria-label={"Add a new vehicle to the fleet"}
                    >
                        Add Vehicle
                    </Button>
                </Box>
            </Box>

            {isLoading ? (
                <LoadingMessage message="Loading vehicles..."/>
            ) : error ? (
                <ServerErrorMessage onRetry={refetch}/>
            ) : (
                <Box
                    component="section"
                    aria-labelledby="main-list-title"
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: "1300px",
                        }}
                        aria-label="Vehicle list and filters"
                    >
                        <VehiclesList
                            vehicles={vehicles}
                            searchText={searchText}
                            setSearchText={handleSearchChange}
                            statusFilter={statusFilter}
                            setStatusFilter={handleStatusChange}
                            onClearFilters={handleClearFilters}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    )
}
