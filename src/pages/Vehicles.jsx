import { Button, Box, Typography} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { VehiclesList } from "../components/VehiclesList";
import { useGetVehicles } from "../hooks/useGetVehicles";
import { FILTER_OPTIONS } from "../utils/constants";
import { useMessages } from "../context/MessagesContext";
import { usePrefetchVehicles } from "../hooks/usePrefetchVehicles";
import { useDebounce } from "../hooks/useDebounce";

export default function Vehicles() {
    const { showMessage } = useMessages();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState(FILTER_OPTIONS.ALL);

    const debouncedSearch = useDebounce(searchText, 500);

    const { data, error } = useGetVehicles({
        page: currentPage,
        search: debouncedSearch,
        status: statusFilter
    });

    const { prefetchNextPage } = usePrefetchVehicles();

    useEffect(() => {
        if (data?.currentPage < data?.totalPages) {
            prefetchNextPage({
                page: currentPage + 1,
                limit: 10,
                search: debouncedSearch,
                status: statusFilter
            });
        }
    }, [data, currentPage, debouncedSearch, statusFilter, prefetchNextPage]);

    useEffect(() => {
        if (error) {
            console.error(error);
            showMessage("Failed to retrieve vehicles data!");
        }
    }, [error, showMessage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, statusFilter]);

    const vehicles = data?.vehicles || [];
    const totalPages = data?.totalPages || 0;

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <Box
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
                        sx={{ fontWeight: "bold" }}
                    >
                        Fleet Tracker
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        component={Link}
                        to="/vehicles/new"
                    >
                        Add Vehicle
                    </Button>
                </Box>
            </Box>

            <Box
                sx={{
                    padding: { xs: 2, md: 4 },
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 1200
                    }}
                >

                    <VehiclesList
                        vehicles={vehicles}
                        searchText={searchText}
                        setSearchText={setSearchText}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                    />

                </Box>
            </Box>
        </Box>
    )
}
