import { useQuery } from "@tanstack/react-query";
import { NavLink, Outlet } from "react-router-dom";
import {
  Activity,
  Bell,
  CalendarDays,
  FileText,
  FlaskConical,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Search,
  Settings,
  Stethoscope,
  UserRound,
  Users,
  ClipboardList,
} from "lucide-react";

import api from "../services/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DOCTOR_ID = import.meta.env.VITE_DOCTOR_ID;

const navItems = [
  { label: "Dashboard", path: "/doctor/dashboard", icon: LayoutDashboard },
  { label: "Appointments", path: "/doctor/appointments", icon: CalendarDays },
  { label: "Patients", path: "/doctor/patients", icon: Users },
  { label: "Consultations", path: "/doctor/visits", icon: Stethoscope },
  { label: "Prescriptions", path: "/doctor/prescriptions", icon: ClipboardList },
  { label: "Lab Reports", path: "/doctor/lab-reports", icon: FlaskConical },
  { label: "Documents", path: "/doctor/documents", icon: FileText },
  { label: "Calendar", path: "/doctor/calendar", icon: CalendarDays },
  { label: "Messages", path: "/doctor/messages", icon: MessageSquare },
];

function DoctorAvatar({ doctor, size = "h-10 w-10" }) {
  const [first, last] = [
    doctor?.first_name?.[0] || "",
    doctor?.last_name?.[0] || "",
  ];

  const imageUrl = doctor?.profile_photo
    ? `${API_BASE_URL}/assets/${doctor.profile_photo}`
    : null;

  return (
    <div
      className={`${size} flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-sm font-semibold text-blue-700`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`${doctor?.first_name || "Doctor"} profile`}
          className="h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      ) : (
        first + last || <UserRound size={18} />
      )}
    </div>
  );
}

function Sidebar({ doctor }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-[245px] flex-col border-r border-slate-200 bg-white">
      {/* Brand */}
      <div className="flex h-[90px] items-center gap-3 border-b border-slate-100 px-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
          <HeartPulse size={25} />
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            MediVault
          </h1>
          <p className="text-xs text-slate-500">Healthcare Management</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-4 pt-6">
        <p className="mb-4 px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Doctor Portal
        </p>

        <nav className="space-y-1">
          {navItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={19}
                    className={isActive ? "text-blue-600" : "text-slate-500"}
                  />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t border-slate-100">
        {/* Doctor profile */}
        <div className="flex items-center gap-3 px-5 py-5">
          <DoctorAvatar doctor={doctor} />

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {doctor
                ? `Dr. ${doctor.first_name} ${doctor.last_name}`
                : "Loading doctor..."}
            </p>
            <p className="truncate text-xs text-slate-500">
              {doctor?.specialization || "Doctor"}
            </p>
          </div>
        </div>

        <div className="space-y-1 px-4 pb-4">
          <NavLink
            to="/doctor/settings"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-600 hover:bg-slate-50"
          >
            <Settings size={18} />
            Settings
          </NavLink>

          <button
            type="button"
            onClick={() => {
              window.location.href = "/login";
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-600 hover:bg-slate-50"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </div>
    </aside>
  );
}

export default function DoctorLayout() {
  const { data: doctor } = useQuery({
    queryKey: ["doctor-profile", DOCTOR_ID],
    queryFn: async () => {
      if (!DOCTOR_ID) return null;

      const response = await api.get(`/items/doctors/${DOCTOR_ID}`, {
        params: {
          fields: "id,first_name,last_name,specialization,profile_photo",
        },
      });

      return response.data.data;
    },
    enabled: Boolean(DOCTOR_ID),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="min-h-screen bg-[#f3f8fd]">
      <Sidebar doctor={doctor} />

      {/* Main section */}
      <div className="ml-[245px] min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-[90px] items-center justify-between border-b border-slate-200 bg-white px-8">
          <p className="text-sm text-slate-500">
            Welcome back, {doctor?.first_name || "Doctor"}.
          </p>

          <div className="flex items-center gap-6">
            <button
              type="button"
              aria-label="Search"
              className="text-slate-500 hover:text-blue-600"
            >
              <Search size={21} />
            </button>

            <button
              type="button"
              aria-label="Notifications"
              className="relative text-slate-500 hover:text-blue-600"
            >
              <Bell size={21} />
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-blue-600" />
            </button>

            <div className="flex items-center gap-3 border-l border-slate-200 pl-5">
              <DoctorAvatar doctor={doctor} size="h-10 w-10" />

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {doctor
                    ? `Dr. ${doctor.first_name} ${doctor.last_name}`
                    : "Doctor"}
                </p>
                <p className="text-xs text-slate-500">
                  {doctor?.specialization || "Healthcare"}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Existing page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}