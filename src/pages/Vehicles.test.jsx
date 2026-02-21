import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Vehicles from "./Vehicles";
import { useGetVehicles } from "../hooks/useGetVehicles";
import { mockShowMessage } from "../setupTests";

vi.mock("../hooks/useGetVehicles", () => ({
    useGetVehicles: vi.fn(),
}));

vi.mock("../hooks/usePrefetchVehicles", () => ({
    usePrefetchVehicles: vi.fn(() => ({
        prefetchNextPage: vi.fn(),
    })),
}));

vi.mock("../context/MessagesContext", () => ({
    useMessages: () => ({ showMessage: mockShowMessage }),
}));

const renderComponent = () => render(
    <MemoryRouter>
        <Vehicles/>
    </MemoryRouter>
);

describe("Vehicles Component", () => {
    beforeEach(() => {
        useGetVehicles.mockReturnValue({
            data: { vehicles: [] },
            totalPages: 1,
            isLoading: false
        });
    });

    describe("Rendering", () => {
        it("should display the page title and 'Add Vehicle' button", () => {
            renderComponent();
            
            expect(screen.getByText(/Fleet Tracker/i)).toBeInTheDocument();

            const addButton = screen.getByRole("link", { name: /add a new vehicle/i });
            expect(addButton).toHaveAttribute("href", "/vehicles/new");
        });

        it("should render loading component when fetching data", () => {
            useGetVehicles.mockReturnValue({
                data: null,
                isLoading: true
            });
            
            renderComponent();

            expect(screen.getByText(/Loading vehicles.../i)).toBeInTheDocument();
        });

        it("should render server error component if data loading fails", () => {
            useGetVehicles.mockReturnValue({
                data: null,
                isLoading: false,
                error: new Error("Fetch failed"),
                refetch: vi.fn()
            });

            renderComponent();

            expect(screen.getByText(/Connection Error/i)).toBeInTheDocument();
            expect(screen.getByText(/We couldn't reach the server. Please try again later./i)).toBeInTheDocument();
            
            expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
        });

        it("should call useGetVehicles with debounced search text", async () => {
            renderComponent();

            const searchInput = screen.getByPlaceholderText(/search/i);
            fireEvent.change(searchInput, { target: { value: "Tesla" } });

            await waitFor(() => {
                expect(useGetVehicles).toHaveBeenCalledWith(expect.objectContaining({
                    search: "Tesla"
                }));
            }, { timeout: 1000 });
        });

        it("should reset to page 1 when search text changes", async () => {     
            renderComponent();

            const searchInput = screen.getByPlaceholderText(/search/i);
            fireEvent.change(searchInput, { target: { value: "Ford" } });

            await waitFor(() => {
                expect(useGetVehicles).toHaveBeenCalledWith(expect.objectContaining({
                    page: 1,
                    search: "Ford"
                }));
            });
        });

        it("should reset to page 1 when status filter changes", async () => {
            renderComponent();

            const selectControl = screen.getByRole("combobox", { name: /status/i });
            fireEvent.mouseDown(selectControl);

            await waitFor(() => {
                expect(useGetVehicles).toHaveBeenCalledWith(expect.objectContaining({
                    page: 1,
                    status: "All"
                }));
            });
        });
    });
});    
