import { Box, Button, Card, CardContent, Typography, Pagination, Grid, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import VehicleFilter from "./VehicleFilter";
import { FILTER_OPTIONS } from "../utils/constants";
import EmptyState from "./EmptyState";
import { usePrefetchVehicles } from "../hooks/usePrefetchVehicles";

export const VehiclesList = ({
    vehicles,
    searchText,
    setSearchText,
    statusFilter,
    setStatusFilter,
    onClearFilters,
    currentPage,
    setCurrentPage,
    totalPages
}) => {
    const { prefetchNextPage } = usePrefetchVehicles();

    const handlePageChange = (_,page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <Box
            component="section"
            sx={{
                maxWidth: 1200,
                width: "100%",
                mx: "auto",
                p: 2,
            }}
        >           
            <VehicleFilter
                label={"Search"}
                options={FILTER_OPTIONS}
                searchText={searchText}
                setSearchText={setSearchText}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                onClear={onClearFilters}
            />

            <Grid
                container
                spacing={3}
                component="ul"
                aria-label="List of vehicles"
                justifyContent="center"
                sx={{ 
                    listStyle: "none", 
                    p: 0, 
                    m: 0,
                    width: '100%' 
                }}
            >
                {vehicles?.length > 0 ? (
                    vehicles.map(vehicle => (
                    <Grid
                        key={vehicle.id}
                        component="li"
                        size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}
                        sx={{
                            display: "flex",
                            justifyContent: "center", // Centra la Card dentro de su celda
                        }}
                    >
                        <Card 
                            sx={{ 
                                width: "100%",
                                maxWidth: { xs: 350, sm: "100%" },
                                display: "flex",
                                flexDirection: "column",
                                boxShadow: 2
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1 }}>

                                <Typography variant="h6" component="h2">
                                    {vehicle.brand} {vehicle.model}
                                </Typography>

                                <Typography sx={{ color: "black" }}>
                                    Plate: {vehicle.plate}
                                </Typography>

                                <Typography>
                                    Year: {vehicle.year}
                                </Typography>
                                
                                <Typography>
                                    Status: {vehicle.status}
                                </Typography>

                            </CardContent>

                            <Box sx={{ p: 2, pt: 0 }}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    component={Link}
                                    to={`/vehicles/${vehicle.id}`}
                                    aria-label={`View details for ${vehicle.brand} ${vehicle.plate}`}
                                >
                                    View Details
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))
            ) : (
                <EmptyState message="No vehicles found matching your search." />
            )}
            </Grid>

            {totalPages >= 1 && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 6
                    }}
                >
                    <Pagination 
                        count={totalPages} 
                        page={currentPage} 
                        onChange={handlePageChange} 
                        color="primary" 
                        variant="outlined" 
                        shape="rounded"
                        renderItem={(item) => (
                            <PaginationItem 
                                {...item}
                                onMouseEnter={() => {
                                    if (item.type === 'next' || (item.type === 'page' && item.page > currentPage)) {
                                        if (item.page <= totalPages) {
                                            prefetchNextPage({
                                                page: item.page,
                                                limit: 10,
                                                search: searchText,
                                                status: statusFilter
                                            });
                                        }
                                    }
                                }}
                            />
                        )}
                    />
                </Box>
            )}
        </Box>
    );
}
