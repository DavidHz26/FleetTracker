import { Box, Stack, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton  from "../components/HomeButton"
import ModalContainer from "../components/ModalContainer";
import { useMessages } from "../context/MessagesContext";

export default function VehicleDetails () {

    const {id} = useParams();
    const [vehicle, setVehicle] = useState(null);
    const navigate = useNavigate();
    const { showMessage } = useMessages();

    const fetchVehicleData = () => {
        axios
        .get(`http://localhost:3001/vehicles/${id}`)
        .then(res =>    {
            setVehicle(res.data);
            showMessage("Data successfully retrieved!", "success");
        })
        .catch(err => {
            console.error(err);
            showMessage("Failed to get vehicle data!");
        });
    }

    useEffect(() => {
        fetchVehicleData()
    }, [id]);

    if(!vehicle) {
        return (
            <></>
        )
    }

    const handleEditVehicle = () => {
        navigate(`/vehicles/${id}/edit`);
    }

    const handleDelete = () => {
        axios
        .delete(`http://localhost:3001/vehicles/${id}`)
        .then(() => navigate("/"))
        .catch(err => {
            console.error(err);
            showMessage("Failed to delete vehicle!")
        });
    }

    return (
        <ModalContainer>
            <Stack spacing={2}>
                <Typography
                    variant="h4"
                    sx={{ color: "black" }}
                >
                    {vehicle.brand} {vehicle.model}
                </Typography>

                <Typography sx={{ color: "black" }}>
                    Plate: {vehicle.plate}
                </Typography>

                <Typography sx={{ color: "black" }}>
                    Year: {vehicle.year}
                </Typography>

                <Typography sx={{ color: "black" }}>
                    Status: {vehicle.status}
                </Typography>

                <Typography sx={{ color: "black" }}>
                    Last Service Date: {vehicle.lastServiceDate}
                </Typography>

                <Typography sx={{ color: "black" }}>
                    Kilometer: {vehicle.kilometer}
                </Typography>

                <Typography sx={{ color: "black" }}>
                    GPS Status: {vehicle.gpsStatus}
                </Typography>
                
                <Typography sx={{ color: "black" }}>
                    Location: {vehicle.location}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleEditVehicle}
                    >
                        Edit
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </Box>
            </Stack>

            <HomeButton/>
     
        </ModalContainer>
    )
}
