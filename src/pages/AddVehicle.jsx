import { Stack, Button, Typography } from "@mui/material";
import { useState } from "react";
import FormField from "../components/FormField";
import FormSelect from "../components/FormSelect";
import axios from "axios";
import HomeButton from "../components/HomeButton";
import ModalContainer from "../components/ModalContainer";
import { GPS_STATUS, VEHICLE_STATUS } from "../utils/constants";
import { validateVehicle } from "../utils/validation";
import { useMessages } from "../context/MessagesContext";

export default function AddVehicle() {
    
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

    const resetForm = () => {
        setVehicle({
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
    };


    const submit = () => {
        const result = validateVehicle(vehicle);
        if(!result.valid){
            showMessage(result.message);
            return;
        }

        const newVehicle = { ...vehicle, year: Number(vehicle.year) };

        axios
        .post("http://localhost:3001/vehicles", newVehicle)
        .then(res => {
            resetForm();
            showMessage("Successfully added!", "success");
        })
        .catch(err => {
            console.error(err);
            showMessage("Failed to add vehicle!");
        });
    }

    const handleChange = (field, value) => {
        setVehicle(prev => ({...prev, [field]: value}));
    }

    return (
        <ModalContainer>
            <Stack spacing={2}>
                <Typography
                    variant="h4"
                    sx={{ color: "black" }}
                >
                    Add New Vehicle
                </Typography>

                <FormField
                    label="Plate"
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

                <Button 
                    variant="contained"
                    onClick={submit}
                >
                    Create
                </Button>
            </Stack>

            <HomeButton/>
        </ModalContainer>
    );
}
