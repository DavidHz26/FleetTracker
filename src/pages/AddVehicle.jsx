import { Stack, Button, Typography } from "@mui/material";
import { useState } from "react";
import HomeButton from "../components/HomeButton";
import ModalContainer from "../components/ModalContainer";
import { validateVehicle } from "../utils/validation";
import { useMessages } from "../context/MessagesContext";
import { useAddVehicle } from "../hooks/useAddVehicle";
import { useNavigate } from "react-router-dom";
import VehicleFormFields from "../components/VehicleFormFields";

export default function AddVehicle() {
    
    const { showMessage } = useMessages();
    const navigate = useNavigate();
    const addMutation = useAddVehicle();

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

    const submit = () => {
        const result = validateVehicle(vehicle);
        if(!result.valid){
            showMessage(result.message);
            return;
        }

        const newVehicle = {
            ...vehicle,
            year: Number(vehicle.year),
            kilometer: Number(vehicle.kilometer)
        };

        addMutation.mutate(newVehicle, {
            onSuccess: () => {
                showMessage("Vehicle added successfully!", "success");
                navigate("/");
            },
            onError: (error) => {
                const errorMessage = error.response?.data?.message || "Failed to add vehicle.";
                showMessage(errorMessage);
            }
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

                <VehicleFormFields vehicle={vehicle} onChange={handleChange}/>

                <Button 
                    variant="contained"
                    onClick={submit}
                    disabled={addMutation.isPending}
                >
                    {addMutation.isPending ? "Creating..." : "Create"}
                </Button>
            </Stack>

            <HomeButton/>
        </ModalContainer>
    );
}
