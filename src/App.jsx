import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Vehicles from "./pages/Vehicles";
import AddVehicle from "./pages/AddVehicle";
import VehicleDetails from "./pages/VehicleDetails";
import EditVehicle from "./pages/EditVehicle";

import { MessagesProvider } from "./context/MessagesContext";

const queryClient = new QueryClient();

function App() {

    return (
        <QueryClientProvider client={queryClient}>
        <MessagesProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Vehicles/>} />
                    <Route path="/vehicles/new" element={<AddVehicle/>} />
                    <Route path="/vehicles/:id" element={<VehicleDetails/>} />
                    <Route path="/vehicles/:id/edit" element={<EditVehicle />} />
                </Routes>
            </Router>
        </MessagesProvider>
        </QueryClientProvider>
    )
};

export default App
