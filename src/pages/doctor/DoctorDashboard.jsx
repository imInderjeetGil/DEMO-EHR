
import {
  UserPlus,
  CalendarPlus,
  ClipboardPlus,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import StatCard from "../../components/ui/StatCard";
import TodayAppointments from "../../components/doctor/TodayAppointments";
import RecentPatients from "../../components/doctor/RecentPatients";

import {
  dashboardStats,
  todayAppointments,
  recentPatients,
} from "../../mocks/doctorDashboard";

export default function DoctorDashboard() {
  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Good morning, Dr. Sharma
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Here's your practice overview for today.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
          <p className="text-xs text-slate-500">Today's schedule</p>
          <p className="mt-1 text-sm font-medium text-slate-800">
            12 appointments · 4 pending
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      {/* Quick actions */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">
            Quick Actions
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Link
            to="/doctor/patients"
            className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:bg-blue-50/50"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <UserPlus size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  View Patients
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Browse patient records
                </p>
              </div>
            </div>
            <ArrowUpRight
              size={18}
              className="text-slate-400 group-hover:text-blue-600"
            />
          </Link>

          <Link
            to="/doctor/appointments"
            className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:bg-blue-50/50"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
                <CalendarPlus size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Appointments
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Manage your schedule
                </p>
              </div>
            </div>
            <ArrowUpRight
              size={18}
              className="text-slate-400 group-hover:text-blue-600"
            />
          </Link>

          <Link
            to="/doctor/prescriptions"
            className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:bg-blue-50/50"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <ClipboardPlus size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Prescriptions
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Review prescriptions
                </p>
              </div>
            </div>
            <ArrowUpRight
              size={18}
              className="text-slate-400 group-hover:text-blue-600"
            />
          </Link>
        </div>
      </section>

      {/* Appointments and recent patients */}
      <TodayAppointments appointments={todayAppointments} />

      <RecentPatients patients={recentPatients} />
    </div>
  );
}
