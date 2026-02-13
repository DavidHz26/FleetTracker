import { Box, Stack, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ModalContainer from "../components/ModalContainer";
import HomeButton from "../components/HomeButton";
import { validateVehicle } from "../utils/validation";
import { useMessages } from "../context/MessagesContext";
import { useEditVehicle } from "../hooks/useEditVehicle";
import { useGetVehicle } from "../hooks/useGetVehicle";
import { LoadingMessage } from "../components/LoadingMessage";
import VehicleFormFields from "../components/VehicleFormFields";

export default function EditVehicle() {
    
    const {id} = useParams();
    const navigate = useNavigate();
    const { showMessage } = useMessages();
    const editMutation = useEditVehicle();
    const { data, isLoading, error } = useGetVehicle(id);

    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        if (data && !vehicle) {

            setVehicle({
                ...data,
                year: data.year ? String(data.year) : "",
                kilometer: data.kilometer ? String(data.kilometer) : ""
            });
        }
    }, [data, vehicle]);

    useEffect(() => {
        if (error) {
            console.error(error);
            showMessage("Failed to load vehicle data!");
        }
    }, [error, showMessage]);

    const submit = () => {
        const result = validateVehicle(vehicle);
        if(!result.valid){
            showMessage(result.message);
            return;
        }

        const updatedVehicle = {
            ...vehicle,
            year: Number(vehicle.year),
            kilometer: Number(vehicle.kilometer)
        };

        editMutation.mutate({ id, updatedVehicle }, {
            onSuccess: () => {
                showMessage("Vehicle updated successfully!", "success");
                navigate(`/vehicles/${id}`);
            },
            onError: (error) => {
                const errorMessage = error.response?.data?.message || "Failed to update vehicle.";
                showMessage(errorMessage);
            }
        });
    }

    const handleChange = (field, value) => {
        setVehicle(prev => ({...prev, [field]: value}));
    };

    if(isLoading || !vehicle){
        return <LoadingMessage/>;
    }

    return(
        <ModalContainer>
            <Stack spacing={2}>
                <Typography
                    variant="h4"
                    sx={{ color: "black" }}
                >
                    Edit Vehicle
                </Typography>

                <VehicleFormFields vehicle={vehicle} onChange={handleChange}/>

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
                        disabled={editMutation.isPending}
                    >
                        {editMutation.isPending ? "Saving..." : "Edit"}
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        component={Link}
                        to={`/vehicles/${id}`}
                        disabled={editMutation.isPending}
                    >
                        Cancel
                    </Button>
                </Box>

                <HomeButton/>
            </Stack>
        </ModalContainer>
    )
}
