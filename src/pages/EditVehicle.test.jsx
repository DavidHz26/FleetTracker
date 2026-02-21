import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import EditVehicle from "./EditVehicle";
import { useEditVehicle } from "../hooks/useEditVehicle";
import { useGetVehicle } from "../hooks/useGetVehicle";
import { mockNavigate, mockShowMessage } from "../setupTests";
import { testData, fillValidForm } from "../test-utils/formHelpers";

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useParams: () => ({ id: "123" }),
    };
});

vi.mock("../context/MessagesContext", () => ({
    useMessages: () => ({
        showMessage: mockShowMessage
    }),
}));

vi.mock("../hooks/useGetVehicle", () => ({
    useGetVehicle: vi.fn()
}));

vi.mock("../hooks/useEditVehicle", () => ({
    useEditVehicle: vi.fn(),
}));

const renderComponent = () => render(
    <MemoryRouter>
        <EditVehicle/>
    </MemoryRouter>
);

describe("EditVehicle Component", () => {
    beforeEach(() => {
        useGetVehicle.mockReturnValue({
            data: testData,
            isLoading: false,
            error: null,
        });

        useEditVehicle.mockReturnValue({
            mutate: vi.fn(),
            isPending: false,
        });
    });

    describe("Rendering", () => {
        it("should render loading component", () => {
            vi.clearAllMocks();

            useGetVehicle.mockReturnValue({
                data: null,
                isLoading: true,
            });

            renderComponent();

            const loadingElement = screen.getByText(/Loading vehicle details.../i);
            expect(loadingElement).toBeInTheDocument();
        });

        it("should render loading component if vehicle is null (not found)", () => {
            useGetVehicle.mockReturnValue({
                data: null,
                isLoading: true,
                error: null
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

            expect(screen.getByText(/Error Loading Vehicle/i)).toBeInTheDocument();
            expect(screen.getByText(/We couldn't retrieve the information/i)).toBeInTheDocument();
            
            expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
        });

        it("should render the HomeButton component", () => {
            renderComponent();

            const homeButton = screen.getByRole("link", { name: /home/i });
            expect(homeButton).toBeInTheDocument();
        });

        it("should display brand, model and plate when data is loaded", async () => {
            renderComponent();

            expect(await screen.findByDisplayValue("VAL-123")).toBeInTheDocument();
            expect(await screen.findByDisplayValue("Toyota")).toBeInTheDocument();
            expect(await screen.findByDisplayValue("Corolla")).toBeInTheDocument();
            expect(await screen.findByDisplayValue("2022")).toBeInTheDocument();
        });
    });

    describe("Form Submit", () => {
        it("should show error message when submitting form with missing required fields", async () => {
            useGetVehicle.mockReturnValue({
                data: {
                    plate: "",
                    brand: "",
                    model: "",
                    year: "",
                    status: "",
                    lastServiceDate: "",
                    kilometer: "",
                    gpsStatus: "",
                    location: ""
                },
                isLoading: false,
            });

            renderComponent();

            const saveButton = screen.getByRole("button", { name: /save/i });
            fireEvent.click(saveButton);

            expect(mockShowMessage).toHaveBeenCalledWith("Plate must be alphanumeric!");
        });

        it("should show error message when API returns an error", async () => {
            useEditVehicle.mockReturnValue({
                mutate: vi.fn().mockImplementation((data, { onError }) => {
                    onError(new Error("API Error"));
                }),
                isPending: false,
            });

            renderComponent();
            fillValidForm();

            fireEvent.click(screen.getByRole("button", { name: /save/i }));

            expect(mockShowMessage).toHaveBeenCalledWith("Failed to update vehicle.");
        });

        it("should call editMutation and navigate on success", async () => {
            const mockMutate = vi.fn((data, { onSuccess }) => onSuccess());
            useEditVehicle.mockReturnValue({
                mutate: mockMutate,
                isPending: false,
            });

            renderComponent();

            await screen.findByDisplayValue("Toyota");

            fillValidForm();

            fireEvent.click(screen.getByRole("button", { name: /save/i }));

            expect(mockMutate).toHaveBeenCalled();
            expect(mockShowMessage).toHaveBeenCalledWith("Vehicle updated successfully!", "success");
            expect(mockNavigate).toHaveBeenCalledWith("/vehicles/123");
        });

        it("should disable buttons while saving", () => {
            useEditVehicle.mockReturnValue({
                mutate: vi.fn(),
                isPending: true,
            });

            renderComponent();

            expect(screen.getByRole("button", { name: /saving.../i })).toBeDisabled();
            expect(screen.getByRole("link", { name: /cancel/i })).toHaveClass("Mui-disabled");
        });
    });
});
