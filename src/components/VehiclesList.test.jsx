import { render, screen, fireEvent } from "@testing-library/react";
import { describe, vi } from "vitest";
import { VehiclesList } from "./VehiclesList";
import { MemoryRouter } from "react-router-dom";
import { usePrefetchVehicles } from "../hooks/usePrefetchVehicles";

vi.mock("../hooks/usePrefetchVehicles", () => ({
    usePrefetchVehicles: vi.fn()
}));

const mockPrefetch = vi.fn();

const renderComponent = (props = {}) => {
    const defaultProps = {
        vehicles: [],
        totalPages: 0,
        currentPage: 1,
        searchText: "",
        statusFilter: "All",
        onClearFilters: vi.fn(),
        setCurrentPage: vi.fn(),
        setSearchText: vi.fn(),
        setStatusFilter: vi.fn(),
        onPageChange: vi.fn(),
        onSearchChange: vi.fn(),
        onStatusChange: vi.fn(),
        ...props
    };

    return render(
        <MemoryRouter>
            <VehiclesList {...defaultProps} />
        </MemoryRouter>
    );
};

describe("VehiclesList Component", () => {
    beforeEach(() => {
        usePrefetchVehicles.mockReturnValue({
            prefetchNextPage: mockPrefetch
        });
    });

    describe("Rendering", () => {
        it("should render the empty state when no vehicles are provided", () => {
            renderComponent();

            expect(screen.getByText(/No vehicles found/i)).toBeInTheDocument();
        });

        it("should call onClearFilters and reset all values when reset button is clicked", () => {
            const mockClear = vi.fn();
            
            renderComponent({ 
                onClearFilters: mockClear, 
                searchText: "Toyota" 
            });

            const resetButton = screen.getByRole("button", { name: /Clear all search filters/i });
            fireEvent.click(resetButton);

            expect(mockClear).toHaveBeenCalledTimes(1);
        });

        it("should be disabled when no filters are applied", () => {
            renderComponent({ 
                searchText: "", 
                status: "All" 
            });

            const resetButton = screen.getByRole("button", { name: /Clear all search filters/i });
            expect(resetButton).toBeDisabled();
        });
    });

    describe("Prefetching", () => {
        it("should call prefetchNextPage on mouse enter pagination next", () => {
            render(
                <MemoryRouter>
                    <VehiclesList 
                        vehicles={[{ id: 1, brand: 'Toyota' }]} 
                        currentPage={1} 
                        totalPages={2} 
                        searchText="Camry"
                    />
                </MemoryRouter>
            );

            const nextButton = screen.getByLabelText(/Go to next page/i);
            fireEvent.mouseEnter(nextButton);

            expect(mockPrefetch).toHaveBeenCalledWith(expect.objectContaining({
                page: 2,
                search: "Camry"
            }));
        });
    });
});
