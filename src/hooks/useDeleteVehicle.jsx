import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabaseAxios } from "../api/supabaseClient";
import { VEHICLES_ENDPOINT, AUTH_QUERY_KEY } from "../utils/constants";

const deleteVehicle = async (id) => {
    const response = await supabaseAxios.delete(VEHICLES_ENDPOINT, {
        params: {
            id: `eq.${id}`
        }
    })
    return response.data;
}

export const useDeleteVehicle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteVehicle,
        onSuccess: (_, id) => {
            queryClient.removeQueries({ queryKey:[AUTH_QUERY_KEY.vehicles, id], exact: true });

            queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEY.vehicles] });
        },
        onError: (error) => {
            console.error("Failed to delete vehicle:", error);
        }    
    });
}
