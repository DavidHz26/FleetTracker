    export const validateVehicle = (vehicle) => {
        const { plate, brand, model, year, status, lastServiceDate, kilometer, gpsStatus, location } = vehicle;

        const plateRegex = /^[A-Z0-9-]+$/i; 
        if (!plateRegex.test(plate)) {
            return {
                message: "Plate must be alphanumeric!",
                valid: false
            }
        }

        if (!brand.trim()) {
            return {
                message: "Brand is required!",
                valid: false
            }
        }

        if (!model.trim()) {
            return {
                message: "Model is required!",
                valid: false
            }
        }

        const currentYear = new Date().getFullYear();
        if (!year || isNaN(year) || year < 1900 || year > currentYear + 1) {
            return {
                message: `Year must be between 1900 and ${currentYear + 1}!`,
                valid: false
            }
        }

        if (!status) {
            return {
                message: "Status is required!",
                valid: false
            }
        }

        if (!lastServiceDate || isNaN(Date.parse(lastServiceDate))) {
            return {
                message: "Last service date is invalid!",
                valid: false
            }
        }

        const km = Number(kilometer);
        if (!kilometer || isNaN(km) || km < 0) {
            return {
                message: "Kilometer must be a valid positive number!",
                valid: false
            }
        }

        if (!gpsStatus) {
          return {
                message: "GPS status is required!",
                valid: false
            }
        }

        if (!location.trim()) {
          return {
                message: "Location is required!",
                valid: false
            }
        }

        return {
            valid: true
        }
    };
