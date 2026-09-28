import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Topbar from "../components/common/Topbar";

const pageTitles = {
  "/patient/dashboard": "My Dashboard",
  "/patient/history": "Medical History",
  "/patient/prescriptions": "My Prescriptions",
  "/patient/appointments": "My Appointments",
  "/patient/reports": "Medical Reports",
};

function PatientLayout() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Patient Portal";

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="patient" />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={title} role="patient" />

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default PatientLayout;