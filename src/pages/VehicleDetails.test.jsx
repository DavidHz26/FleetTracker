import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import VehicleDetails from "./VehicleDetails";
import { useGetVehicle } from "../hooks/useGetVehicle";
import { useDeleteVehicle } from "../hooks/useDeleteVehicle";
import { mockNavigate, mockShowMessage } from "../setupTests";
import { testData } from "../test-utils/formHelpers";

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useParams: vi.fn(() => ({ id: "123" })), 
    };
});

vi.mock("../context/MessagesContext", () => ({
    useMessages: () => ({
        showMessage: mockShowMessage,
    }),
}));

vi.mock("../hooks/useGetVehicle", () => ({
    useGetVehicle: vi.fn(),
}));

vi.mock("../hooks/useDeleteVehicle", () => ({
    useDeleteVehicle: vi.fn(),
}));

const renderComponent = () => render(
    <MemoryRouter>
        <VehicleDetails/>
    </MemoryRouter>
);

describe("VehicleDetails Component", () => {
    let mockMutate;

    beforeEach(() => {
        mockMutate = vi.fn();

        useGetVehicle.mockReturnValue({
            data: testData,
            isLoading: false,
            error: null
        });

        useDeleteVehicle.mockReturnValue({
            mutate: mockMutate,
            isPending: false,
        });
    });

    describe("Rendering", () => {
        it("should render loading message if vehicle is null and loading", () => {
            useGetVehicle.mockReturnValue({
                data: null,
                isLoading: true
            });

            renderComponent();

            expect(screen.getByText(/Loading vehicle details.../i)).toBeInTheDocument();
        });

        it("should render server error component if data loading fails", () => {
            useGetVehicle.mockReturnValue({
                data: null,
                isLoading: false,
                error: new Error("Fetch failed"),
                refetch: vi.fn()
            });

            renderComponent();

            expect(mockShowMessage).toHaveBeenCalledWith("Failed to load vehicle data!");

            expect(screen.getByText(/Error Loading Vehicle/i)).toBeInTheDocument();
            expect(screen.getByText(/We couldn't retrieve the information/i)).toBeInTheDocument();
            
            expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
        });

        it("should display brand, model and plate when data is loaded", async () => {
            renderComponent();
           
            expect(await screen.findByText(/VAL-123/i)).toBeInTheDocument();
            expect(await screen.findByText(/Toyota/i)).toBeInTheDocument();
            expect(await screen.findByText(/Corolla/i)).toBeInTheDocument();
        });

        it("should disable delete button and show 'Deleting...' when isPending is true", () => {
            useDeleteVehicle.mockReturnValue({
                mutate: mockMutate,
                isPending: true,
            });

            renderComponent();

            const deleteButton = screen.getByRole("button", { name: /deleting/i });
            expect(deleteButton).toBeDisabled();
        });

        it("should show error message if data loading fails", async () => {
            useGetVehicle.mockReturnValue({
                data: null,
                isLoading: false,
                error: new Error("Fetch failed")
            });

            renderComponent();
            await waitFor(() => {
                expect(mockShowMessage).toHaveBeenCalledWith("Failed to load vehicle data!");
            });
        });
    });

    describe("Delete Action", () => {
        it("should call delete mutation when delete button is clicked", () => {
            const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);
            renderComponent();

            fireEvent.click(screen.getByRole("button", { name: /delete/i }));

            expect(confirmSpy).toHaveBeenCalled();
            expect(mockMutate).toHaveBeenCalled();
        });

        it("should not call delete mutation if user cancels confirm", () => {
            vi.spyOn(window, "confirm").mockReturnValue(false);
            renderComponent();

            fireEvent.click(screen.getByRole("button", { name: /delete/i }));
            expect(mockMutate).not.toHaveBeenCalled();
        });

        it("should call showMessage and navigate to home on successful deletion", () => {
            mockMutate.mockImplementation((id, options) => {
                options.onSuccess();
            });

            vi.spyOn(window, "confirm").mockReturnValue(true);
            renderComponent();

            fireEvent.click(screen.getByRole("button", { name: /delete/i }));

            expect(mockShowMessage).toHaveBeenCalledWith("Vehicle deleted successfully!", "success");
            expect(mockNavigate).toHaveBeenCalledWith("/");
        });

        it("should show error message when deletion fails", () => {
            mockMutate.mockImplementation((id, options) => {
                options.onError();
            });

            vi.spyOn(window, "confirm").mockReturnValue(true);
            renderComponent();

            fireEvent.click(screen.getByRole("button", { name: /delete/i }));

            expect(mockShowMessage).toHaveBeenCalledWith("Failed to delete vehicle!");
            expect(mockNavigate).not.toHaveBeenCalled();
        });
    });
});
