import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AUTH_QUERY_KEY } from "../utils/constants";

const putVehicle = async ({ id, updatedVehicle }) => {
    const response = await axios.put(`http://localhost:3001/vehicles/${id}`, updatedVehicle);
    return response.data;
}

export const useEditVehicle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: putVehicle,
        onSuccess: (_,{ id }) => {
            queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEY.vehicles] });
            queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEY.vehicles, id] });
            
        },
        onError: (error) => {
            console.error("Failed to edit vehicle:", error);
        },
    });
}
