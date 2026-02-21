import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabaseAxios } from "../api/supabaseClient";
import { VEHICLES_ENDPOINT, AUTH_QUERY_KEY } from "../utils/constants";

const patchVehicle = async ({ id, updatedVehicle }) => {
    const response = await supabaseAxios.patch(VEHICLES_ENDPOINT, updatedVehicle, {
        params: {
            id: `eq.${id}`
        }
    });
    return response.data;
}

export const useEditVehicle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: patchVehicle,
        onSuccess: (_,{ id }) => {
            queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEY.vehicles] });
            queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEY.vehicles, id] });
            
        },
        onError: (error) => {
            console.error("Failed to edit vehicle:", error);
        },
    });
}
