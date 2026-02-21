import { useQuery } from "@tanstack/react-query";
import { supabaseAxios } from "../api/supabaseClient";
import { AUTH_QUERY_KEY, FILTER_OPTIONS } from "../utils/constants";
import { VEHICLES_ENDPOINT } from "../utils/constants";

export const fetchVehicles = async ({ queryKey }) => {
    const { page = 1, limit = 10, search = "", status = FILTER_OPTIONS.ALL } = queryKey[1] || {};
    const from = (page - 1) * limit;
    const to = from + limit -1;

    try {
        const response = await supabaseAxios.get(VEHICLES_ENDPOINT, {
            params: {
                select: '*',
                status: status && status !== FILTER_OPTIONS.ALL ? `eq.${status}` : undefined,
                or: search ?`(brand.ilike.*${search}*, plate.ilike.*${search}*)` : undefined,
            },
            headers: {
               'Prefer': 'count=exact',
               'Range': `${from}-${to}`
            }
        });

        const contentRange = response.headers['content-range'];
        const totalCount = contentRange ? parseInt(contentRange.split('/')[1]) : 0;

        return {
            vehicles: response.data,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
        }
    } catch (error) {
        console.error("Failed to fetch vehicles:", error);
        throw error;
    } 
}

export const useGetVehicles = ({ page = 1, limit = 10, search = "", status = FILTER_OPTIONS.ALL }) => {
    return useQuery({
        queryKey: [AUTH_QUERY_KEY.vehicles, { page, limit, search, status }],
        queryFn: fetchVehicles,
        placeholderData: (previousData) => previousData,
    })
}
