import { useQuery } from "@tanstack/react-query";
import { supabaseAxios } from "../api/supabaseClient";
import { VEHICLES_ENDPOINT, AUTH_QUERY_KEY } from "../utils/constants";

const fetchVehicle = async ({ queryKey }) => {
    const [, id] = queryKey;
 
    const response = await supabaseAxios.get(VEHICLES_ENDPOINT, {
        params: {
            id: `eq.${id}`,
            select: "*",
        },
    });
    return response.data?.[0] || null;
}

export const useGetVehicle = (id, options = {}) => {
    return useQuery({
        queryKey: [AUTH_QUERY_KEY.vehicles, id],
        queryFn: fetchVehicle,
        enabled: !!id && (options.enabled ?? true),
        ...options
    });
}
