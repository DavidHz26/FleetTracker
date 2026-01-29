import { Stack, Button, Typography, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import FormField from "../components/FormField";
import FormSelect from "../components/FormSelect";
import axios from "axios";
import HomeButton from "../components/HomeButton";
import ModalContainer from "../components/ModalContainer";

export default function AddVehicle() {
    
    const [plate, setPlate] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [status, setStatus] = useState("");
    const [lastServiceDate, setLastServiceDate] = useState("");
    const [kilometer, setKilometer] = useState("");
    const [gpsStatus, setGpsStatus] = useState("");
    const [location, setLocation] = useState("");

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

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
        setPlate("");
        setBrand("");
        setModel("");
        setYear("");
        setStatus("");
        setLastServiceDate("");
        setKilometer("");
        setGpsStatus("");
        setLocation("");
    }

    const validate = () => {
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
        setSnackbarMessage(message);
        setSnackbarSeverity(type);
        setSnackbarOpen(true);
    }

    const submit = () => {
        if(!validate()){
            return;
        }

        const newVehicle = { plate, brand, model, year: Number(year), status, lastServiceDate, kilometer, gpsStatus, location };

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

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway"){
            return;
        }
        setSnackbarOpen(false);
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
                    value={plate}
                    onChange={e => setPlate(e.target.value)}
                />

                <FormField 
                    label="Brand"
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                />

                <FormField
                    label="Model"
                    value={model}
                    onChange={e => setModel(e.target.value)}
                />

                <FormField
                    label="Year"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                />

                <FormSelect
                    label="Status"
                    value={status}
                    onChange={setStatus}
                    options={status_options}
                />

                <FormField
                    label="Last Service Date"
                    value={lastServiceDate}
                    onChange={e => setLastServiceDate(e.target.value)}
                />

                <FormField
                    label="Kilometer"
                    value={kilometer}
                    onChange={e => setKilometer(e.target.value)}
                />

                <FormSelect
                    label="GPS Status"
                    value={gpsStatus}
                    onChange={setGpsStatus}
                    options={gps_status_options}
                />

                <FormField
                    label="Location"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                />

                <Button 
                    variant="contained"
                    onClick={submit}
                >
                    Create
                </Button>
            </Stack>
           
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <HomeButton/>
        </ModalContainer>
    );
}
