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
        <Stack
            spacing={2.5}
            component="fieldset"
            sx={{
                border: "none",
                margin: 0,
                padding: 0,
                minWidth: 0,
            }}
        >
            <FormField
                id="plate_input"
                label="Plate"
                placeholder="Ex. ABC-1234"
                value={vehicle.plate || ""}
                onChange={e => handleChange("plate", e)}
                inputProps={{ "aria-required": "true" }}
            />

            <FormField
                id="brand_input"
                label="Brand"
                placeholder="Ex. Toyota"
                value={vehicle.brand || ""}
                onChange={e => handleChange("brand", e)}
                inputProps={{ "aria-required": "true" }}
            />

            <FormField
                id="model_input"
                label="Model"
                placeholder="Ex. Corolla"
                value={vehicle.model || ""}
                onChange={e => handleChange("model", e)}
                inputProps={{ "aria-required": "true" }}
            />

            <FormField
                id="year_input"
                label="Year"
                type="number"
                value={vehicle.year || ""}
                onChange={e => handleChange("year", e)}
                inputProps={{
                    min: 1900,
                    max: 2100,
                    "aria-required": "true"
                }}
            />
            
            <FormSelect
                id="status_select"
                label="Status"
                value={vehicle.status || ""}
                onChange={val=> handleChange("status", val)}
                options={VEHICLE_STATUS}
                inputProps={{ "aria-required": "true" }}
            />

            <FormField
                id="last_service_date_input"
                label="Last Service Date"
                type="date"
                value={vehicle.lastServiceDate || ""}
                onChange={e => handleChange("lastServiceDate", e)}
                inputProps={{"aria-required": "true"}}
                slotProps={{ inputLabel: { shrink: true } }}
            />

            <FormField
                id="kilometer_input"
                label="Kilometer"
                type="number"
                placeholder="0"
                value={vehicle.kilometer || ""}
                onChange={e => handleChange("kilometer", e)}
                inputProps={{
                    min: 0,
                    "aria-required": "true"
                }}
            />

            <FormSelect
                id="gps_status_select"
                label="GPS Status"
                value={vehicle.gpsStatus || ""}
                onChange={val => handleChange("gpsStatus", val)}
                options={GPS_STATUS}
                inputProps={{ "aria-required": "true" }}
            />

            <FormField
                id="location_input"
                label="Location"
                placeholder="Ex. New York"
                value={vehicle.location || ""}
                onChange={e => handleChange("location", e)}
                inputProps={{ "aria-required": "true" }}
            />
        </Stack>
    );
}
