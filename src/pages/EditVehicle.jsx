import { Box, Stack, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import CenteredLayout from "../components/CenteredLayout";
import { validateVehicle } from "../utils/validation";
import { useMessages } from "../context/MessagesContext";
import { useEditVehicle } from "../hooks/useEditVehicle";
import { useGetVehicle } from "../hooks/useGetVehicle";
import { LoadingMessage } from "../components/LoadingMessage";
import VehicleFormFields from "../components/VehicleFormFields";
import { ServerErrorMessage } from "../components/ServerErrorMessage";

export default function EditVehicle() {
    const {id} = useParams();
    const navigate = useNavigate();
    const { showMessage } = useMessages();
    const editMutation = useEditVehicle();
    const { data, isLoading, error, refetch } = useGetVehicle(id);

    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        if (!data) {
            return;
        }

        setVehicle({
            ...data,
            year: data.year ? String(data.year) : "",
            kilometer: data.kilometer ? String(data.kilometer) : ""
        });
    }, [data]);

    const submit = () => {
        if(editMutation.isPending){
            return;
        }

        const result = validateVehicle(vehicle);
        if(!result.valid){
            showMessage(result.message);
            return;
        }

        const updatedVehicle = {
            ...vehicle,
            year: Number(vehicle.year),
            kilometer: Number(vehicle.kilometer),
            plate: vehicle.plate.trim().toUpperCase(),
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

    if (error) {
        return (
            <ServerErrorMessage 
                title="Error Loading Vehicle"
                message="We couldn't retrieve the information for this vehicle."
                onRetry={refetch}
            />
        );
    }

    if(isLoading || !vehicle){
        return <LoadingMessage message="Loading vehicle details..."/>
    }

    return(
        <CenteredLayout showHomeButton={true}>
            <Stack
                spacing={3}
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
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
                        color="error"
                        component={Link}
                        to={`/vehicles/${id}`}
                        disabled={editMutation.isPending}
                        aria-label="Cancel editing and return to vehicle details"
                    >
                        Cancel
                    </Button>
                    
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={editMutation.isPending}
                        aria-busy={editMutation.isPending}
                    >
                        {editMutation.isPending ? "Saving..." : "Save"}
                    </Button>
                </Box>
            </Stack>
        </CenteredLayout>
    )
}
