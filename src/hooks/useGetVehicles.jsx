import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { VEHICLES_ENDPOINT, AUTH_QUERY_KEY, FILTER_OPTIONS } from "../utils/constants";

export const fetchVehicles = async ({ queryKey }) => {
    const { page = 1, limit = 10, search = "", status = FILTER_OPTIONS.ALL } = queryKey[1] || {};

    const filterParams = new URLSearchParams();
    if(search)  {
        filterParams.append('search', search);
    }

    if (status && status !== FILTER_OPTIONS.ALL) {
        filterParams.append('status', status);
    }
   
    const paginationParams = new URLSearchParams(filterParams);
    paginationParams.append('page', page);
    paginationParams.append('limit', limit);

    try {
        const [dataResponse, countResponse] = await Promise.all([
            axios.get(`${VEHICLES_ENDPOINT}?${paginationParams.toString()}`),
            axios.get(`${VEHICLES_ENDPOINT}?${filterParams.toString()}`)
        ]);

        const totalCount = countResponse.data.length || 0;

        return {
            vehicles: dataResponse.data,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    } 
}

export const useGetVehicles = ({ page = 1, limit = 10, search = "", status = FILTER_OPTIONS.ALL }) => {
    return useQuery({
        queryKey: [AUTH_QUERY_KEY.vehicles, { page, limit, search, status }],
        queryFn: fetchVehicles
    })
}
