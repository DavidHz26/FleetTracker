import { Box, Stack, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import FormField from "../components/FormField";
import FormSelect from "../components/FormSelect";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ModalContainer from "../components/ModalContainer";
import HomeButton from "../components/HomeButton";
import { validateVehicle } from "../utils/validation";
import { useMessages } from "../context/MessagesContext";
import { GPS_STATUS, VEHICLE_STATUS } from "../utils/constants";

export default function EditVehicle() {
    
    const {id} = useParams();
    const navigate = useNavigate();
    const { showMessage } = useMessages();

    const [vehicle, setVehicle] = useState({
        plate: "",
        brand: "",
        model: "",
        year: "",
        status: "",
        lastServiceDate: "",
        kilometer: "",
        gpsStatus: "",
        location: ""
    });

    const fetchVehicleData = () => {
        axios
        .get(`http://localhost:3001/vehicles/${id}`)
        .then(res => {
            setVehicle(res.data)
            showMessage("Data successfully retrieved!", "success");
        })
        .catch(err => {
            console.error(err);
            showMessage("Failed to get vehicle data!");
        });
    }

    const submit = () => {
        const result = validateVehicle(vehicle);
        if(!result.valid){
            showMessage(result.message);
            return;
        }

        const updatedVehicle = { ...vehicle, year: Number(vehicle.year) };

        axios
        .put(`http://localhost:3001/vehicles/${id}`, updatedVehicle)
        .then(res => navigate(`/vehicles/${id}`))
        .catch(err => {
            console.error(err);
            showMessage("Failed to update vehicle!")
        });
    }

    const cancel = () => {
        navigate(`/vehicles/${id}`)
    }

    const handleChange = (field, value) => {
        setVehicle(prev => ({...prev, [field]: value}));
    };

    useEffect(() => {
        fetchVehicleData();
    }, [id]);

    return(
        <ModalContainer>
            <Stack spacing={2}>
                <Typography
                    variant="h4"
                    sx={{ color: "black" }}
                >
                    Edit Vehicle
                </Typography>

                <FormField
                    label={"Plate"}
                    value={vehicle.plate}
                    onChange={e => handleChange("plate", e.target.value)}
                />

                <FormField
                    label="Brand"
                    value={vehicle.brand}
                    onChange={e => handleChange("brand", e.target.value)}
                />

                <FormField
                    label="Model"
                    value={vehicle.model}
                    onChange={e => handleChange("model", e.target.value)}
                />

                <FormField
                    label="Year"
                    value={vehicle.year}
                    onChange={e => handleChange("year", e.target.value)}
                />

                <FormSelect
                    label="Status"
                    value={vehicle.status}
                    onChange={val => handleChange("status", val)}
                    options={VEHICLE_STATUS}
                />

                <FormField
                    label="Last Service Date"
                    value={vehicle.lastServiceDate}
                    onChange={e => handleChange("lastServiceDate", e.target.value)}
                />

                <FormField
                    label="Kilometer"
                    value={vehicle.kilometer}
                    onChange={e => handleChange("kilometer", e.target.value)}
                />

                <FormSelect
                    label="GPS Status"
                    value={vehicle.gpsStatus}
                    onChange={val => handleChange("gpsStatus", val)}
                    options={GPS_STATUS}
                />

                <FormField
                    label="Location"
                    value={vehicle.location}
                    onChange={e => handleChange("location", e.target.value)}
                />

                <Box 
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 2
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={submit}
                    >
                        Edit
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        onClick={cancel}
                    >
                        Cancel
                    </Button>
                </Box>

                <HomeButton/>
            </Stack>
        </ModalContainer>
    )
}
