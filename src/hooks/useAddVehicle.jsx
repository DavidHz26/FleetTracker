import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AUTH_QUERY_KEY } from "../utils/constants";

const postVehicle = async (newVehicle) => {
    const response = await axios.post("http://localhost:3001/vehicles", newVehicle);
    return response.data;
}

export const useAddVehicle = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: postVehicle,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEY.vehicles] });
        },
        onError: (error) => {
            console.error("Failed to add vehicle:", error);
        },
    });
}
