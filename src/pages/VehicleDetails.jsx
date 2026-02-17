import { Box, Stack, Typography, Button } from "@mui/material";
import { useParams, useNavigate, Link } from "react-router-dom";
import HomeButton  from "../components/HomeButton"
import ModalContainer from "../components/ModalContainer";
import { useMessages } from "../context/MessagesContext";
import { useGetVehicle } from "../hooks/useGetVehicle";
import { useDeleteVehicle } from "../hooks/useDeleteVehicle";
import { LoadingMessage } from "../components/LoadingMessage";

export default function VehicleDetails () {
    const {id} = useParams();
    const navigate = useNavigate();
    const { showMessage } = useMessages();

    const { data: vehicle, isLoading } = useGetVehicle(id);

    const { mutate: deleteMutation, isPending: isDeleting } = useDeleteVehicle();

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this vehicle?")) {
            deleteMutation(id, {
                onSuccess: () => {
                    showMessage("Vehicle deleted successfully!", "success");
                    navigate("/");
                },
                onError: (error) => {
                    showMessage("Failed to delete vehicle!");
                    console.error("Delete vehicle error:", error);
                }
            });
        };
    }

    if(isLoading || !vehicle){
        return <LoadingMessage message="Loading vehicle details..."/>
    }

    return (
        <ModalContainer>
            <Stack spacing={2}>
                <Typography
                    variant="h4"
                    sx={{ color: "black" }}
                >
                    {vehicle.brand} {vehicle.model}
                </Typography>

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
                    <strong>Kilometer:</strong> {vehicle.kilometer}
                </Typography>

                <Typography sx={{ color: "black" }}>
                    <strong>GPS Status:</strong> {vehicle.gpsStatus}
                </Typography>
                
                <Typography sx={{ color: "black" }}>
                    <strong>Location:</strong> {vehicle.location}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`/vehicles/${id}/edit`}
                    >
                        Edit
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                </Box>
            </Stack>

            <HomeButton/>
     
        </ModalContainer>
    )
}
