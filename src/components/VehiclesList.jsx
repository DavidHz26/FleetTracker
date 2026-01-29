import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VehicleFilter from "./VehicleFilter";

export default function VehiclesList ({currentPage, itemsPerPage, setCurrentPage}) {

    const [vehicles, setVehicles] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const statusOptions = ["All", "Available", "Unavailable", "Repair"];

    const fetchVehiclesData = () => {
        let url = `http://localhost:3001/vehicles?_page=${currentPage}&_limit=${itemsPerPage}`;

        if(searchText){
            url += `&q=${encodeURIComponent(searchText)}`;
        }

        if(statusFilter && statusFilter != "All"){
            url += `&status=${encodeURIComponent(statusFilter)}`;
        }

        axios
        .get(url)
        .then(res => {
            setVehicles(res.data);

            const totalCount = Number(res.headers["x-total-count"]);
            setTotalPages(Math.ceil(totalCount / itemsPerPage));
        })
        .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchVehiclesData();
    }, [currentPage, itemsPerPage, searchText, statusFilter]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchText, statusFilter]);

    return (
        <Box
            sx={{
                maxWidth: 1200,
                width: "100%",
                mx: "auto"
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                <VehicleFilter
                    label={"Search by plate, brand or model"}
                    options={statusOptions}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 3,
                }}
            >
                {vehicles.map(vehicle => (
                    <Box
                        key={vehicle.id}
                        sx={{
                            width: "18%",
                            minWidth: 220,
                            display: "flex"
                        }}
                    >
                        <Card 
                            sx={{ 
                                width: "100%",
                                display: "flex",
                                flexDirection: "column"
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
                    </Box>
                ))}
            </Box>


            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                    mt: 4
                }}
            >
                {[...Array(totalPages)].map((_, i) => (
                    <Button
                        key={i}
                        variant={i + 1 === currentPage ? "contained" : "outlined"}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </Button>
                ))}
            </Box>
        </Box>
    );
}
