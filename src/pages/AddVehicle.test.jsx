import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AddVehicle from "./AddVehicle";
import { useAddVehicle } from "../hooks/useAddVehicle";
import { mockNavigate, mockShowMessage } from "../setupTests";
import { fillValidForm } from "../test-utils/formHelpers";

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

vi.mock("../context/MessagesContext", () => ({
    useMessages: () => ({
        showMessage: mockShowMessage
    }),
}));

vi.mock("../hooks/useAddVehicle", () => ({
    useAddVehicle: vi.fn(),
}));

const renderComponent = () => render(
    <MemoryRouter>
        <AddVehicle/>
    </MemoryRouter>
);

describe("AddVehicle Component", () => {
    beforeEach(() => {
        useAddVehicle.mockReturnValue({
            mutate: vi.fn(),
            isPending: false,
        });
    });

    describe("Rendering", () => {
        it("should render the title and main button", () => {
            renderComponent();
            expect(screen.getByText(/Add New Vehicle/i)).toBeInTheDocument();
            expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
        });

        it("should render all form fields", () => {
            renderComponent();

            expect(screen.getByText(/Add New Vehicle/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Plate/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Brand/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Model/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Year/i)).toBeInTheDocument();
            expect(screen.getByLabelText("Status")).toBeInTheDocument();
            expect(screen.getByLabelText(/Last Service Date/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Kilometer/i)).toBeInTheDocument();
            expect(screen.getByLabelText("GPS Status")).toBeInTheDocument();
            expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
            expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
        });

        it("should render the HomeButton component", () => {
            renderComponent();

            const homeButton = screen.getByRole("link", { name: /home/i });
            expect(homeButton).toBeInTheDocument();
        });
    });

    describe("Form Submit", () => {
        it("should show error message when submitting form with missing required fields", async () => {
            renderComponent();

            fireEvent.change(screen.getByLabelText(/Plate/i), { target: { value: "NEW-999" } });

            const submitButton = screen.getByRole("button", { name: /create/i });
            fireEvent.click(submitButton);

            expect(mockShowMessage).toHaveBeenCalledWith("Brand is required!");
        });

        it("should show error message when API returns an error", async () => {
            useAddVehicle.mockReturnValue({
                mutate: vi.fn().mockImplementation((data, { onError }) => {
                    onError(new Error("API Error"));
                }),
                isPending: false,
            });

            renderComponent();
            fillValidForm();

            const submitButton = screen.getByRole("button", { name: /create/i });
            fireEvent.click(submitButton);

            expect(mockShowMessage).toHaveBeenCalledWith("Failed to add vehicle.");
        });

        it("should disable button and show 'Creating...' while pending", () => {
            useAddVehicle.mockReturnValue({
                mutate: vi.fn(),
                isPending: true,
            });

            renderComponent();

            const button = screen.getByRole("button", { name: /creating/i });
            expect(button).toBeDisabled();
        });

        it("should call mutate with correct data and format when form is submitted", async () => {
            const mockMutate = vi.fn((data, { onSuccess }) => onSuccess());

            useAddVehicle.mockReturnValue({
                mutate: mockMutate,
                isPending: false,
            });

            renderComponent();
            fillValidForm();

            const submitButton = screen.getByRole("button", { name: /create/i });
            fireEvent.click(submitButton);

            expect(mockMutate).toHaveBeenCalledWith(
                expect.objectContaining({
                    plate: "VAL-123",
                    brand: "Toyota",
                    model: "Corolla",
                    year: 2022,
                    status: "Available",
                    lastServiceDate: "2024-01-01",
                    kilometer: 1000,
                    gpsStatus: "Tracked",
                    location: "New York",
                }),
                expect.any(Object)
            );
            expect(mockShowMessage).toHaveBeenCalledWith("Vehicle added successfully!", "success");
            expect(mockNavigate).toHaveBeenCalledWith("/");
        });
    });
});
