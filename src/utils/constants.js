export const API_BASE_URL = "https://6993ba5cfade7a9ec0f35497.mockapi.io/api/v1";

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
