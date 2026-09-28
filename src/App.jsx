import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import DoctorLayout from "./layouts/DoctorLayout";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import Appointments from "./pages/doctor/Appointments";
import LabReports from "./pages/doctor/LabReports";
import PatientList from "./pages/doctor/PatientList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/doctor/dashboard" replace />} />

        <Route path="/doctor" element={<DoctorLayout />}>
          <Route
            index
            element={<Navigate to="/doctor/dashboard" replace />}
          />

          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="lab-reports" element={<LabReports />} />
          <Route path="patients" element={<PatientList />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/doctor/dashboard" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}