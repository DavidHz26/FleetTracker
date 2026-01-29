import { Box, Stack, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import FormField from "../components/FormField";
import FormSelect from "../components/FormSelect";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ModalContainer from "../components/ModalContainer";
import HomeButton from "../components/HomeButton";

export default function EditVehicle() {
    
    const {id} = useParams();
    const navigate = useNavigate();

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
        .then(res => setVehicle(res.data))
        .catch(err => console.error(err));
    }

    const status_options = [
        "Available",
        "Unavailable",
        "Repair"
    ]

    const gps_status_options = [
        "Tracked",
        "Untracked",
        "Maintenance"
    ]

    const submit = () => {
        const updatedVehicle = { ...vehicle, year: Number(vehicle.year) };

        axios
        .put(`http://localhost:3001/vehicles/${id}`, updatedVehicle)
        .then(res => navigate(`/vehicles/${id}`))
        .catch(err => console.error("Failed to update vehicle!", err));
    }

    const cancel = () => {
        navigate(`/vehicles/${id}`)
    }

    const handleChange = (field, value) => {
        const updatedVehicle = { ...vehicle };
        updatedVehicle[field] = value;
        setVehicle(updatedVehicle);
    };

    useEffect(() => {
        fetchVehicleData();
    }, []);

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
                    placeholder="00000"
                />

                <FormField
                    label="Brand"
                    value={vehicle.brand}
                    onChange={e => handleChange("brand", e.target.value)}
                    placeholder="Mazda"
                />

                <FormField
                    label="Model"
                    value={vehicle.model}
                    onChange={e => handleChange("model", e.target.value)}
                    placeholder="M3"
                />

                <FormField
                    label="Year"
                    value={vehicle.year}
                    onChange={e => handleChange("year", e.target.value)}
                    placeholder="2015"
                />

                <FormSelect
                    label="Status"
                    value={vehicle.status}
                    onChange={val => handleChange("status", val)}
                    options={status_options}
                />

                <FormField
                    label="Last Service Date"
                    value={vehicle.lastServiceDate}
                    onChange={e => handleChange("lastServiceDate", e.target.value)}
                    placeholder="2015-01-15"
                />

                <FormField
                    label="Kilometer"
                    value={vehicle.kilometer}
                    onChange={e => handleChange("kilometer", e.target.value)}
                    placeholder="2015-01-15"
                />

                <FormSelect
                    label="GPS Status"
                    value={vehicle.gpsStatus}
                    onChange={val => handleChange("gpsStatus", val)}
                    options={gps_status_options}
                />

                <FormField
                    label="Location"
                    value={vehicle.location}
                    onChange={e => handleChange("location", e.target.value)}
                    placeholder="New York"
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
