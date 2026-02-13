import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AUTH_QUERY_KEY } from "../utils/constants";

const fetchVehicle = async ({ queryKey }) => {
    const [, id] = queryKey;
    const response = await axios.get(`http://localhost:3001/vehicles/${id}`);
    return response.data;
}

export const useGetVehicle = (id, options = {}) => {
    return useQuery({
        queryKey: [AUTH_QUERY_KEY.vehicles, id],
        queryFn: fetchVehicle,
        enabled: !!id && (options.enabled ?? true),
        ...options
    });
}
