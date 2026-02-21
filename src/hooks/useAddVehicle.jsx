import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabaseAxios } from "../api/supabaseClient";
import { VEHICLES_ENDPOINT, AUTH_QUERY_KEY } from "../utils/constants";

const postVehicle = async (newVehicle) => {
    const response = await supabaseAxios.post(VEHICLES_ENDPOINT, newVehicle);
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
