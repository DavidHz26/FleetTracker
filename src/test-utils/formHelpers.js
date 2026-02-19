import { screen, fireEvent } from "@testing-library/react";

export const fillValidForm = () => {
    fireEvent.change(screen.getByLabelText(/Plate/i), { target: { value: "VAL-123" } });
    fireEvent.change(screen.getByLabelText(/Brand/i), { target: { value: "Toyota" } });
    fireEvent.change(screen.getByLabelText(/Model/i), { target: { value: "Corolla" } });
    fireEvent.change(screen.getByLabelText(/Year/i), { target: { value: "2022" } });
    fireEvent.change(screen.getByLabelText(/Last Service Date/i), { target: { value: "2024-01-01" } });
    fireEvent.change(screen.getByLabelText(/Kilometer/i), { target: { value: "1000" } });
    fireEvent.change(screen.getByLabelText(/Location/i), { target: { value: "New York" } });

    fireEvent.mouseDown(screen.getByLabelText("Status"));
    fireEvent.click(screen.getByRole("option", { name: "Available" }));
    fireEvent.mouseDown(screen.getByLabelText("GPS Status"));
    fireEvent.click(screen.getByRole("option", { name: "Tracked" }));
};

export const testData = {
    plate: "VAL-123", 
    brand: "Toyota", 
    model: "Corolla", 
    year: "2022",
    status: "Available",
    lastServiceDate: "2024-01-01",
    kilometer: "1000",
    gpsStatus: "Tracked",
    location: "New York"
}
