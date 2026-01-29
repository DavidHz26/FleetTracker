import { Button, Box, Typography} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VehiclesList from "../components/VehiclesList";

export default function Vehicles() {

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const handleAddVehicle = () => {
        navigate("/vehicles/new");
    }

    return (
        <Box
            sx={{
                position: "fixed",
                inset: 0,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    padding: 4,
                    borderBottom: "1px solid #ddd",
                    flexShrink: 0,
                    zIndex: 1,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        maxWidth: 1400,
                        margin: "0 auto",
                    }}
                >
                    <Typography variant="h4">Fleet Tracker</Typography>

                    <Button variant="contained" onClick={handleAddVehicle}>
                        Add Vehicle
                    </Button>
                </Box>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    padding: 4,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Box sx={{ width: "100%", maxWidth: 1400 }}>
                    <VehiclesList
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        setCurrentPage={setCurrentPage}
                    />
                </Box>
            </Box>
        </Box>
    )
}
