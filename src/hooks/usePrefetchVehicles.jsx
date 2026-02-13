import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { AUTH_QUERY_KEY } from "../utils/constants";
import { fetchVehicles } from "./useGetVehicles";

export const usePrefetchVehicles = () => {
    const queryClient = useQueryClient();

    const prefetchNextPage = useCallback(async ({ page, limit, search, status }) => {
        await queryClient.prefetchQuery({
            queryKey: [AUTH_QUERY_KEY.vehicles, { page, limit, search, status }],
            queryFn: fetchVehicles,
        });
    }, [queryClient]);

    return { prefetchNextPage };
};
