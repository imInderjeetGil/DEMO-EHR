import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DoctorLayout from "./layouts/DoctorLayout";
import PatientLayout from "./layouts/PatientLayout";

import LandingPage from "./pages/LandingPage";
import PlaceholderPage from "./pages/PlaceholderPage";

import PatientList from "./pages/doctor/PatientList";
import DoctorWorkspace from "./pages/doctor/DoctorWorkspace";
import PatientDashboard from "./pages/patient/PatientDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<LandingPage />} />

        {/* Temporary auth placeholders */}
        <Route
          path="/login"
          element={<PlaceholderPage title="Login" />}
        />

        <Route
          path="/signup"
          element={<PlaceholderPage title="Create Account" />}
        />

        {/* Doctor */}
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route
            path="dashboard"
            element={<DoctorDashboard />}
          />

          <Route
            path="patients"
            element={<PatientList />}
          />

          <Route
            path="patients/:id/workspace"
            element={<DoctorWorkspace />}
          />

          <Route
            path="appointments"
            element={<PlaceholderPage title="Appointments" />}
          />

          <Route
            path="prescriptions"
            element={<PlaceholderPage title="Prescriptions" />}
          />
        </Route>

        {/* Patient */}
        <Route path="/patient" element={<PatientLayout />}>
          <Route
            path="dashboard"
            element={<PatientDashboard />}
          />

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

        {/* Fallback */}
        <Route
          path="*"
          element={<PlaceholderPage title="Page Not Found" />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;