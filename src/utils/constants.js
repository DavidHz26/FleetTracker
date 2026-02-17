export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const VEHICLES_ENDPOINT = `${API_BASE_URL}/vehicles`;

export const AUTH_QUERY_KEY = {
    vehicles: ["vehicles"],
}

export const FILTER_OPTIONS = {
    ALL: "All",
    AVAILABLE: "Available",
    UNAVAILABLE: "Unavailable",
    REPAIR: "Repair",
}

export const VEHICLE_STATUS = {
    AVAILABLE: "Available",
    UNAVAILABLE: "Unavailable",
    REPAIR: "Repair",
}

export const GPS_STATUS = {
    TRACKED: "Tracked",
    UNTRACKED: "Untracked",
    MAINTENANCE: "Maintenance",
}
