import { Stack } from "@mui/material";
import FormField from "./FormField";
import FormSelect from "./FormSelect";
import { GPS_STATUS, VEHICLE_STATUS } from "../utils/constants";

export default function VehicleFormFields({ vehicle, onChange }) {
    
    const handleChange = (field, e) => {
        const value = (e && e.target) ? e.target.value : e;
        onChange(field, value);
    };

    return (
        <Stack spacing={2}>
            <FormField
                id="plate_input"
                label="Plate"
                value={vehicle.plate || ""}
                onChange={e => handleChange("plate", e)}
            />

            <FormField
                id="brand_input"
                label="Brand"
                value={vehicle.brand || ""}
                onChange={e => handleChange("brand", e)}
            />

            <FormField
                id="model_input"
                label="Model"
                value={vehicle.model || ""}
                onChange={e => handleChange("model", e)}
            />

            <FormField
                id="year_input"
                label="Year"
                type="number"
                value={vehicle.year || ""}
                onChange={e => handleChange("year", e)}
            />
            
            <FormSelect
                id="status_select"
                label="Status"
                value={vehicle.status || ""}
                onChange={val=> handleChange("status", val)}
                options={VEHICLE_STATUS}
            />

            <FormField
                id="last_service_date_input"
                label="Last Service Date"
                type="date"
                value={vehicle.lastServiceDate || ""}
                onChange={e => handleChange("lastServiceDate", e)}
                InputLabelProps={{ shrink: true }}
            />

            <FormField
                id="kilometer_input"
                label="Kilometer"
                type="number"
                value={vehicle.kilometer || ""}
                onChange={e => handleChange("kilometer", e)}
            />

            <FormSelect
                id="gps_status_select"
                label="GPS Status"
                value={vehicle.gpsStatus || ""}
                onChange={val => handleChange("gpsStatus", val)}
                options={GPS_STATUS}
            />

            <FormField
                id="location_input"
                label="Location"
                value={vehicle.location || ""}
                onChange={e => handleChange("location", e)}
            />
        </Stack>
    );
}
