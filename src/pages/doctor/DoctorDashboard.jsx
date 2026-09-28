import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  UserPlus,
  CalendarPlus,
  ClipboardPlus,
  ArrowUpRight,
  Users,
  CalendarDays,
  ClipboardList,
  CheckCircle2,
  RefreshCw,
  UserRound,
  FlaskConical,
  Clock3,
} from "lucide-react";
import { Link } from "react-router-dom";

import api from "../../services/api";

const DOCTOR_ID = Number(import.meta.env.VITE_DOCTOR_ID || 1);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatTime(time) {
  if (!time) return "—";

  const [hours, minutes] = time.split(":");
  const date = new Date();
  date.setHours(Number(hours), Number(minutes), 0, 0);

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function getFullName(person) {
  if (!person) return "Unknown Patient";

  return [person.first_name, person.last_name]
    .filter(Boolean)
    .join(" ") || "Unknown Patient";
}

function getInitials(person) {
  return `${person?.first_name?.[0] || ""}${
    person?.last_name?.[0] || ""
  }`.toUpperCase() || "—";
}

function getAssetUrl(fileId) {
  if (!fileId || !API_BASE_URL) return null;

  return `${API_BASE_URL}/assets/${fileId}`;
}

function getStatusStyle(status = "") {
  const value = status.toLowerCase();

  if (["completed", "complete"].includes(value)) {
    return "bg-emerald-50 text-emerald-700";
  }

  if (["in_progress", "in progress", "ongoing"].includes(value)) {
    return "bg-blue-50 text-blue-700";
  }

  if (["pending", "waiting"].includes(value)) {
    return "bg-amber-50 text-amber-700";
  }

  return "bg-slate-100 text-slate-600";
}

function StatCard({ title, value, subtitle, icon: Icon, color }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">
            {value}
          </p>
        </div>

        <div className={`rounded-xl p-3 ${color}`}>
          <Icon size={22} />
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500">{subtitle}</p>
    </div>
  );
}

function DoctorAvatar({ doctor }) {
  const [imageFailed, setImageFailed] = useState(false);
  const imageUrl = getAssetUrl(doctor?.profile_photo);

  if (imageUrl && !imageFailed) {
    return (
      <img
        src={imageUrl}
        alt={getFullName(doctor)}
        onError={() => setImageFailed(true)}
        className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-sm"
      />
    );
  }

  return (
    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-2xl font-semibold text-blue-700">
      {getInitials(doctor)}
    </div>
  );
}

function PatientAvatar({ patient }) {
  const [imageFailed, setImageFailed] = useState(false);
  const imageUrl = getAssetUrl(patient?.profile_image);

  if (imageUrl && !imageFailed) {
    return (
      <img
        src={imageUrl}
        alt={getFullName(patient)}
        onError={() => setImageFailed(true)}
        className="h-11 w-11 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
      {getInitials(patient) || <UserRound size={18} />}
    </div>
  );
}

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4">
      <p className="text-sm font-medium text-red-800">
        {message || "Unable to load data."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 text-sm font-medium text-red-700 underline"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export default function DoctorDashboard() {
  const today = getToday();

  const doctorQuery = useQuery({
    queryKey: ["doctor", DOCTOR_ID],
    queryFn: async () => {
      const response = await api.get(`/items/doctors/${DOCTOR_ID}`);
      return response.data.data;
    },
  });

  const appointmentsQuery = useQuery({
    queryKey: ["appointments", "today", DOCTOR_ID, today],
    queryFn: async () => {
      const response = await api.get("/items/appointments", {
        params: {
          "filter[doctor][_eq]": DOCTOR_ID,
          "filter[appointment_date][_eq]": today,
          fields:
            "id,appointment_date,appointment_time,reason,status,patient.id,patient.first_name,patient.last_name,patient.patient_code,patient.profile_image",
          sort: "appointment_time",
          limit: 100,
        },
      });

      return response.data.data || [];
    },
  });

  const patientsQuery = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const response = await api.get("/items/patients", {
        params: {
          fields:
            "id,patient_code,first_name,last_name,profile_image,city",
          sort: "-id",
          limit: 100,
        },
      });

      return response.data.data || [];
    },
  });

  const labReportsQuery = useQuery({
    queryKey: ["lab-reports", DOCTOR_ID],
    queryFn: async () => {
      const response = await api.get("/items/lab_reports", {
        params: {
          "filter[visit][doctor][_eq]": DOCTOR_ID,
          fields: "id,status",
          limit: 100,
        },
      });

      return response.data.data || [];
    },
  });

  const doctor = doctorQuery.data;
  const appointments = appointmentsQuery.data || [];
  const patients = patientsQuery.data || [];
  const labReports = labReportsQuery.data || [];

  const pendingAppointments = appointments.filter((item) =>
    ["pending", "scheduled", "waiting"].includes(
      item.status?.toLowerCase()
    )
  );

  const completedAppointments = appointments.filter((item) =>
    ["completed", "complete"].includes(item.status?.toLowerCase())
  );

  const pendingReports = labReports.filter((item) =>
    ["pending", "review", "in_review"].includes(
      item.status?.toLowerCase()
    )
  );

  const isLoading =
    doctorQuery.isLoading ||
    appointmentsQuery.isLoading ||
    patientsQuery.isLoading ||
    labReportsQuery.isLoading;

  const refreshAll = () => {
    doctorQuery.refetch();
    appointmentsQuery.refetch();
    patientsQuery.refetch();
    labReportsQuery.refetch();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">Doctor Portal</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">
            Good morning, {doctor?.first_name ? `Dr. ${doctor.first_name}` : "Doctor"}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Here's your practice overview for today.
          </p>
        </div>

        <button
          onClick={refreshAll}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
        >
          <RefreshCw
            size={16}
            className={isLoading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Doctor Profile */}
      <section className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
        {doctorQuery.isError ? (
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <UserRound size={32} />
          </div>
        ) : (
          <DoctorAvatar doctor={doctor} />
        )}

        <div className="flex-1">
          <p className="text-sm text-slate-500">Your profile</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-900">
            {doctor ? `Dr. ${getFullName(doctor)}` : "Loading doctor..."}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {doctor?.specialization || "Specialization not available"}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {doctor?.doctor_code ? `ID: ${doctor.doctor_code}` : ""}
            {doctor?.department ? ` · ${doctor.department}` : ""}
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 px-5 py-4">
          <p className="text-xs text-blue-700">Today's schedule</p>
          <p className="mt-1 text-lg font-semibold text-blue-900">
            {appointments.length} appointments
          </p>
          <p className="mt-1 text-xs text-blue-700">
            {pendingAppointments.length} pending
          </p>
        </div>
      </section>

      {doctorQuery.isError && (
        <ErrorMessage
          message="Doctor profile could not be loaded. Check the doctor ID and Directus permissions."
          onRetry={() => doctorQuery.refetch()}
        />
      )}

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Today's Appointments"
          value={appointmentsQuery.isLoading ? "—" : appointments.length}
          subtitle="Appointments scheduled for today"
          icon={CalendarDays}
          color="bg-blue-50 text-blue-600"
        />

        <StatCard
          title="Total Patients"
          value={patientsQuery.isLoading ? "—" : patients.length}
          subtitle="Patients returned by the API"
          icon={Users}
          color="bg-violet-50 text-violet-600"
        />

        <StatCard
          title="Pending Consultations"
          value={appointmentsQuery.isLoading ? "—" : pendingAppointments.length}
          subtitle="Scheduled or awaiting consultation"
          icon={ClipboardList}
          color="bg-amber-50 text-amber-600"
        />

        <StatCard
          title="Completed Today"
          value={appointmentsQuery.isLoading ? "—" : completedAppointments.length}
          subtitle="Appointments marked completed"
          icon={CheckCircle2}
          color="bg-emerald-50 text-emerald-600"
        />
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="mb-3 font-semibold text-slate-900">Quick Actions</h2>

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
            <ArrowUpRight size={18} className="text-slate-400" />
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
            <ArrowUpRight size={18} className="text-slate-400" />
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
            <ArrowUpRight size={18} className="text-slate-400" />
          </Link>
        </div>
      </section>

      {/* Today's Appointments */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="font-semibold text-slate-900">
              Today's Appointments
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Your appointments for {today}
            </p>
          </div>

          <Link
            to="/doctor/appointments"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View all →
          </Link>
        </div>

        {appointmentsQuery.isLoading ? (
          <div className="p-8 text-center text-sm text-slate-500">
            <RefreshCw size={20} className="mx-auto mb-3 animate-spin" />
            Loading appointments...
          </div>
        ) : appointmentsQuery.isError ? (
          <div className="p-5">
            <ErrorMessage
              message="Unable to load today's appointments. Check Directus permissions and API filters."
              onRetry={() => appointmentsQuery.refetch()}
            />
          </div>
        ) : appointments.length === 0 ? (
          <div className="p-10 text-center">
            <CalendarDays size={28} className="mx-auto text-slate-300" />
            <p className="mt-3 font-medium text-slate-700">
              No appointments today
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Appointments for this doctor will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {appointments.slice(0, 8).map((appointment) => (
              <div
                key={appointment.id}
                className="flex flex-col gap-4 px-5 py-4 transition hover:bg-slate-50 sm:flex-row sm:items-center"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <PatientAvatar patient={appointment.patient} />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {getFullName(appointment.patient)}
                    </p>
                    <p className="mt-1 truncate text-sm text-slate-500">
                      {appointment.reason || "Consultation"}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {appointment.patient?.patient_code || "No patient code"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock3 size={16} />
                  {formatTime(appointment.appointment_time)}
                </div>

                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusStyle(
                    appointment.status
                  )}`}
                >
                  {(appointment.status || "scheduled").replaceAll("_", " ")}
                </span>

                <Link
                  to={
                    appointment.patient?.id
                      ? `/doctor/patients/${appointment.patient.id}/workspace`
                      : "/doctor/appointments"
                  }
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Open
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recent Patients and Lab Reports */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="font-semibold text-slate-900">Recent Patients</h2>
              <p className="mt-1 text-sm text-slate-500">
                Recently returned patient records
              </p>
            </div>
            <Link
              to="/doctor/patients"
              className="text-sm font-medium text-blue-600"
            >
              View all →
            </Link>
          </div>

          {patientsQuery.isLoading ? (
            <p className="p-6 text-sm text-slate-500">Loading patients...</p>
          ) : patientsQuery.isError ? (
            <div className="p-4">
              <ErrorMessage
                message="Unable to load patients."
                onRetry={() => patientsQuery.refetch()}
              />
            </div>
          ) : patients.length === 0 ? (
            <p className="p-6 text-sm text-slate-500">No patients found.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {patients.slice(0, 5).map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center gap-3 px-5 py-4"
                >
                  <PatientAvatar patient={patient} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {getFullName(patient)}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {patient.patient_code || "No patient code"}
                    </p>
                  </div>
                  <Link
                    to={`/doctor/patients/${patient.id}/workspace`}
                    className="text-sm font-medium text-blue-600"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="font-semibold text-slate-900">Lab Reports</h2>
              <p className="mt-1 text-sm text-slate-500">
                Reports awaiting review
              </p>
            </div>
            <Link
              to="/doctor/lab-reports"
              className="text-sm font-medium text-blue-600"
            >
              View all →
            </Link>
          </div>

          {labReportsQuery.isLoading ? (
            <p className="p-6 text-sm text-slate-500">
              Loading lab reports...
            </p>
          ) : labReportsQuery.isError ? (
            <div className="p-4">
              <ErrorMessage
                message="Unable to load lab reports. Check the lab-reports API permissions and visit relationship."
                onRetry={() => labReportsQuery.refetch()}
              />
            </div>
          ) : (
            <div className="p-5">
              <div className="flex items-center gap-4 rounded-xl bg-rose-50 p-5">
                <div className="rounded-xl bg-white p-3 text-rose-600">
                  <FlaskConical size={24} />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-slate-900">
                    {pendingReports.length}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Pending lab reports
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                Total reports: {labReports.length}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
