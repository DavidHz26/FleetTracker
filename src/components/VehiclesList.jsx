import { Box, Button, Card, CardContent, Typography, Pagination, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import VehicleFilter from "./VehicleFilter";
import { FILTER_OPTIONS } from "../utils/constants";

export const VehiclesList = ({ vehicles, searchText, setSearchText, statusFilter, setStatusFilter, currentPage, setCurrentPage, totalPages }) => {

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    }

    return (
        <Box
            sx={{
                maxWidth: 1200,
                width: "100%",
                mx: "auto",
                p: 2
            }}
        >           
            <VehicleFilter
                label={"Search"}
                options={FILTER_OPTIONS}
                searchText={searchText}
                setSearchText={setSearchText}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />
         
            <Grid container spacing={3}>
                {vehicles?.length > 0 ? (
                    vehicles.map(vehicle => (
                    <Grid item
                        key={vehicle.id}
                        sx={{
                            flexBasis: {
                                xs: '100%',
                                sm: '50%',
                                md: '22%' 
                            },
                            maxWidth: {
                                xs: '100%',
                                sm: '50%',
                                md: '18%'
                            },
                            display: "flex"
                        }}
                    >
                        <Card 
                            sx={{ 
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                boxShadow: 2
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1 }}>

                                <Typography variant="h6">
                                    {vehicle.brand} {vehicle.model}
                                </Typography>

                                <Typography>
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
                                >
                                    View Details
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))
            ) : (
                <Grid item xs={12}>
                    <Typography align="center" sx={{ mt: 4, color: "text.secondary" }}>
                        No vehicles found matching your search.
                    </Typography>
                </Grid>
            )}
            </Grid>

            {totalPages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                    <Pagination 
                        count={totalPages} 
                        page={currentPage} 
                        onChange={handlePageChange} 
                        color="primary" 
                        variant="outlined" 
                        shape="rounded" 
                    />
                </Box>
            )}
        </Box>
    );
}
