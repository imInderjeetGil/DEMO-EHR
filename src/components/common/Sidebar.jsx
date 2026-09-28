import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  FileText,
  Pill,
  UserRound,
  Activity,
  Settings,
  LogOut,
} from "lucide-react";

const doctorLinks = [
  {
    label: "Dashboard",
    path: "/doctor/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Patients",
    path: "/doctor/patients",
    icon: Users,
  },
  {
    label: "Appointments",
    path: "/doctor/appointments",
    icon: CalendarDays,
  },
  {
    label: "Prescriptions",
    path: "/doctor/prescriptions",
    icon: Pill,
  },
];

const patientLinks = [
  {
    label: "Dashboard",
    path: "/patient/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Medical History",
    path: "/patient/history",
    icon: Activity,
  },
  {
    label: "Prescriptions",
    path: "/patient/prescriptions",
    icon: Pill,
  },
  {
    label: "Appointments",
    path: "/patient/appointments",
    icon: CalendarDays,
  },
  {
    label: "Reports",
    path: "/patient/reports",
    icon: FileText,
  },
];

function Sidebar({ role }) {
  const isDoctor = role === "doctor";
  const links = isDoctor ? doctorLinks : patientLinks;

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
          <Activity size={22} />
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            MediVault
          </h1>
          <p className="text-xs text-slate-500">
            Healthcare Management
          </p>
        </div>
      </div>

      {/* Role label */}
      <div className="px-6 pb-3 pt-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {isDoctor ? "Doctor Portal" : "Patient Portal"}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <Icon size={19} />
              {link.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom links */}
      <div className="space-y-1 border-t border-slate-100 p-3">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
        >
          <Settings size={19} />
          Settings
        </button>

        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
        >
          <LogOut size={19} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;