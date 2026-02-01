import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Vehicles from "./pages/Vehicles";
import AddVehicle from "./pages/AddVehicle";
import VehicleDetails from "./pages/VehicleDetails";
import EditVehicle from "./pages/EditVehicle";

import { MessagesProvider } from "./context/MessagesContext";

function App() {

    return (
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
    )
};

export default App
