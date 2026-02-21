import { Box, Stack, Typography, Button } from "@mui/material";
import { useParams, useNavigate, Link } from "react-router-dom";
import CenteredLayout from "../components/CenteredLayout";
import { useMessages } from "../context/MessagesContext";
import { useGetVehicle } from "../hooks/useGetVehicle";
import { useDeleteVehicle } from "../hooks/useDeleteVehicle";
import { LoadingMessage } from "../components/LoadingMessage";
import { ServerErrorMessage } from "../components/ServerErrorMessage";

export default function VehicleDetails () {
    const {id} = useParams();
    const navigate = useNavigate();
    const { showMessage } = useMessages();

    const { data: vehicle, isLoading, error, refetch } = useGetVehicle(id);

    const { mutate: deleteMutation, isPending: isDeleting } = useDeleteVehicle();

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${vehicle.brand} ${vehicle.plate}? This action cannot be undone.`)) {
            deleteMutation(id, {
                onSuccess: () => {
                    navigate("/", { replace: true });
                    showMessage("Vehicle deleted successfully!", "success");
                },
                onError: (error) => {
                    const errorMessage = error.response?.data?.message || "Failed to delete vehicle!";
                    showMessage(errorMessage);
                }
            });
        };
    }

    if(isLoading){
        return <LoadingMessage message="Loading vehicle details..."/>
    }

    if(error || !vehicle){
        return (
            <ServerErrorMessage 
                title="Error Loading Vehicle"
                message="We couldn't retrieve the information for this vehicle."
                onRetry={refetch}
            />
        );
    }

    return (
        <CenteredLayout showHomeButton={true}>
            <Stack spacing={2} component="article">
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{ color: "black" }}
                >
                    {vehicle.brand} {vehicle.model}
                </Typography>

                <Box
                    component="section"
                    aria-label="Vehicle information"
                >
                    <Typography sx={{ color: "black" }}>
                        <strong>Plate:</strong> {vehicle.plate}
                    </Typography>

                    <Typography sx={{ color: "black" }}>
                        <strong>Year:</strong> {vehicle.year}
                    </Typography>

                    <Typography sx={{ color: "black" }}>
                        <strong>Status:</strong> {vehicle.status}
                    </Typography>

                    <Typography sx={{ color: "black" }}>
                        <strong>Last Service Date:</strong> {vehicle.lastServiceDate}
                    </Typography>

                    <Typography sx={{ color: "black" }}>
                        <strong>Kilometer:</strong> {vehicle.kilometer} km
                    </Typography>

                    <Typography sx={{ color: "black" }}>
                        <strong>GPS Status:</strong> {vehicle.gpsStatus}
                    </Typography>
                    
                    <Typography sx={{ color: "black" }}>
                        <strong>Location:</strong> {vehicle.location}
                    </Typography>
                </Box>

                <Box
                    component="nav"
                    aria-label="Vehicle actions"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        aria-busy={isDeleting}
                        aria-label={`Delete vehicle ${vehicle.plate}`}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`/vehicles/${id}/edit`}
                        aria-label={`Edit details for vehicle ${vehicle.plate}`}
                    >
                        Edit Details
                    </Button>                    
                </Box>
            </Stack>
        </CenteredLayout>
    )
}
