import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AUTH_QUERY_KEY, FILTER_OPTIONS } from "../utils/constants";

export const fetchVehicles = async ({ queryKey }) => {
    const { page = 1, limit = 10, search = "", status = FILTER_OPTIONS.ALL } = queryKey[1] || {};

    const params = new URLSearchParams({
        _page: page,
        _limit: limit,
    })

    if (search) {
        params.append('q', search);
    }

    if (status && status !== FILTER_OPTIONS.ALL) {
        params.append('status', status);
    }

    const response = await axios.get(`http://localhost:3001/vehicles?${params.toString()}`);

    const totalCount = Number(response.headers["x-total-count"]) || 0;

    return {
        vehicles: response.data,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
    }
}

export const useGetVehicles = ({ page = 1, limit = 10, search = "", status = FILTER_OPTIONS.ALL }) => {
    return useQuery({
        queryKey: [AUTH_QUERY_KEY.vehicles, { page, limit, search, status }],
        queryFn: fetchVehicles
    })
}
