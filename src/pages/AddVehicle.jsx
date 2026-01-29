import { Stack, Button, Typography, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import FormField from "../components/FormField";
import FormSelect from "../components/FormSelect";
import axios from "axios";
import HomeButton from "../components/HomeButton";
import ModalContainer from "../components/ModalContainer";

export default function AddVehicle() {
    
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

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

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

    const validate = () => {
        const { plate, brand, model, year, status, lastServiceDate, kilometer, gpsStatus, location } = vehicle;

        if (!plate.trim()) {
            sendMessage("Plate is required");
            return false;
        }

        if (!brand.trim()) {
            sendMessage("Brand is required");
            return false;
        }

        if (!model.trim()) {
            sendMessage("Model is required");
            return false;
        }

        if (!year || isNaN(year)) {
            sendMessage("Year must be a number");
            return false;
        }

        if (!status) {
            sendMessage("Status is required");
            return false;
        }

        if (!lastServiceDate || isNaN(Date.parse(lastServiceDate))) {
            sendMessage("Last service date is invalid");
            return false;
        }

        const km = Number(kilometer);
        if (!kilometer || isNaN(km) || km < 0) {
            sendMessage("Kilometer must be a valid positive number");
            return false;
        }

        if (!gpsStatus) {
            sendMessage("GPS status is required");
            return false;
        }

        if (!location.trim()) {
            sendMessage("Location is required");
            return false;
        }

        return true;
    };

    const sendMessage = (message, type = "error") => {
        setSnackbar({ open: true, message, severity: type });
    };

    const submit = () => {
        if(!validate()){
            return;
        }

        const newVehicle = { ...vehicle, year: Number(vehicle.year) };

        axios
        .post("http://localhost:3001/vehicles", newVehicle)
        .then(res => {
            resetForm();
            sendMessage("Successfully added!", "success");
        })
        .catch(err => {
            console.error(err);
            sendMessage("Failed to create new vehicle!");
        });
    }

    const handleChange = (field, value) => {
        const updatedVehicle = { ...vehicle };
        updatedVehicle[field] = value;
        setVehicle(updatedVehicle);
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway"){
            return;
        }
        setSnackbar(prev => ({ ...prev, open: false }));
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
                    options={status_options}
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
                    options={gps_status_options}
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
           
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

            <HomeButton/>
        </ModalContainer>
    );
}
