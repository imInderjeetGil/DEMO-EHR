import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DoctorLayout from "./layouts/DoctorLayout";
import PatientLayout from "./layouts/PatientLayout";

import PlaceholderPage from "./pages/PlaceholderPage";
import PatientList from "./pages/doctor/PatientList";
import DoctorWorkspace from "./pages/doctor/DoctorWorkspace";
import PatientDashboard from "./pages/patient/PatientDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/doctor/dashboard" replace />} />

        {/* Doctor routes */}
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route
            path="dashboard"
            element={<PlaceholderPage title="Doctor Dashboard" />}
          />
          <Route path="patients" element={<PatientList />} />
          <Route
            path="patients/:id/workspace"
            element={<DoctorWorkspace />}
          />
          <Route
            path="appointments"
            element={<PlaceholderPage title="Appointments" />}
          />
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route
            path="prescriptions"
            element={<PlaceholderPage title="Prescriptions" />}
          />
        </Route>

        {/* Patient routes */}
        <Route path="/patient" element={<PatientLayout />}>
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route
            path="history"
            element={<PlaceholderPage title="Medical History" />}
          />
          <Route
            path="prescriptions"
            element={<PlaceholderPage title="Prescriptions" />}
          />
          <Route
            path="appointments"
            element={<PlaceholderPage title="Appointments" />}
          />
          <Route
            path="reports"
            element={<PlaceholderPage title="Medical Reports" />}
          />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;