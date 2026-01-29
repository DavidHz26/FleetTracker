import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Vehicles from "./pages/Vehicles";
import AddVehicle from "./pages/AddVehicle";
import VehicleDetails from "./pages/VehicleDetails";
import EditVehicle from "./pages/EditVehicle";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Vehicles/>} />
        <Route path="/vehicles/new" element={<AddVehicle/>} />
        <Route path="/vehicles/:id" element={<VehicleDetails/>} />
        <Route path="/vehicles/:id/edit" element={<EditVehicle />} />
      </Routes>
    </Router>
  )
};

export default App
