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

    const [plate, setPlate] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [status, setStatus] = useState("");
    const [lastServiceDate, setLastServiceDate] = useState("");
    const [kilometer, setKilometer] = useState("");
    const [gpsStatus, setGpsStatus] = useState("");
    const [location, setLocation] = useState("");

    const fetchVehicleData = () => {
        axios
        .get(`http://localhost:3001/vehicles/${id}`)
        .then(res => {
            const { plate, brand, model, year, status, lastServiceDate, kilometer, gpsStatus, location} = res.data;

            setPlate(plate);
            setBrand(brand);
            setModel(model);
            setYear(year);
            setStatus(status);
            setLastServiceDate(lastServiceDate);
            setKilometer(kilometer);
            setGpsStatus(gpsStatus);
            setLocation(location);
        })
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
        const updatedVehicle = { plate, brand, model, year: Number(year), status, lastServiceDate, kilometer, gpsStatus, location };

        axios
        .put(`http://localhost:3001/vehicles/${id}`, updatedVehicle)
        .then(res => navigate(`/vehicles/${id}`))
        .catch(err => console.error("Failed to update vehicle!", err));
    }

    const cancel = () => {
        navigate(`/vehicles/${id}`)
    }

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
                    value={plate}
                    onChange={e => setPlate(e.target.value)}
                    placeholder="00000"
                />

                <FormField
                    label={"Brand"}
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                    placeholder="Mazda"
                />

                <FormField
                    label={"Model"}
                    value={model}
                    onChange={e => setModel(e.target.value)}
                    placeholder="M3"
                />

                <FormField
                    label={"Year"}
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    placeholder="2015"
                />

                <FormSelect
                    label={"Status"}
                    value={status}
                    onChange={setStatus}
                    options={status_options}
                />

                <FormField
                    label={"Last Service Date"}
                    value={lastServiceDate}
                    onChange={e => setLastServiceDate(e.target.value)}
                    placeholder="2015-01-15"
                />

                <FormField
                    label={"Kilometer"}
                    value={kilometer}
                    onChange={e => setKilometer(e.target.value)}
                    placeholder="2015-01-15"
                />

                <FormSelect
                    label={"GPS Status"}
                    value={gpsStatus}
                    onChange={setGpsStatus}
                    options={gps_status_options}
                />

                <FormField
                    label={"Location"}
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="2015-01-15"
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
