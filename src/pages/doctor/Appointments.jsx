
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CalendarDays,
  Search,
  Clock,
  UserRound,
  RefreshCw,
} from "lucide-react";
import { appointmentService } from "../../services/appointmentService";

function formatDate(dateString) {
  if (!dateString) return "—";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(timeString) {
  if (!timeString) return "—";

  const match = timeString.match(/^(\d{1,2}):(\d{2})/);

  if (!match) return timeString;

  const date = new Date();
  date.setHours(Number(match[1]), Number(match[2]), 0, 0);

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function getPatientName(patient) {
  if (!patient) return "Unknown Patient";

  const name = [patient.first_name, patient.last_name]
    .filter(Boolean)
    .join(" ");

  return name || "Unknown Patient";
}

function getStatusClass(status) {
  const value = String(status || "").toLowerCase();

  if (value === "completed") {
    return "bg-green-100 text-green-700";
  }

  if (value === "cancelled" || value === "canceled") {
    return "bg-red-100 text-red-700";
  }

  if (value === "confirmed") {
    return "bg-blue-100 text-blue-700";
  }

  if (value === "pending") {
    return "bg-yellow-100 text-yellow-700";
  }

  return "bg-gray-100 text-gray-700";
}

export default function Appointments() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const {
    data: appointments = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => appointmentService.getAll(),
  });

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const patientName = getPatientName(appointment.patient);
      const patientCode = appointment.patient?.patient_code || "";
      const reason = appointment.reason || "";
      const status = String(appointment.status || "").toLowerCase();

      const searchText = search.toLowerCase();

      const matchesSearch =
        patientName.toLowerCase().includes(searchText) ||
        patientCode.toLowerCase().includes(searchText) ||
        reason.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "all" || status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, search, statusFilter]);

  const counts = useMemo(() => {
    return {
      total: appointments.length,
      pending: appointments.filter(
        (item) => String(item.status).toLowerCase() === "pending"
      ).length,
      confirmed: appointments.filter(
        (item) => String(item.status).toLowerCase() === "confirmed"
      ).length,
      completed: appointments.filter(
        (item) => String(item.status).toLowerCase() === "completed"
      ).length,
    };
  }, [appointments]);

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-center">
          <RefreshCw className="mx-auto mb-3 h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-700">
          Failed to load appointments
        </h2>
        <p className="mt-2 text-sm text-red-600">
          {error?.message || "Something went wrong."}
        </p>
        <button
          onClick={() => refetch()}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Appointments
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and view your patient appointments.
          </p>
        </div>

        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw
            className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total Appointments",
            value: counts.total,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Pending",
            value: counts.pending,
            color: "text-yellow-600",
            bg: "bg-yellow-50",
          },
          {
            label: "Confirmed",
            value: counts.confirmed,
            color: "text-green-600",
            bg: "bg-green-50",
          },
          {
            label: "Completed",
            value: counts.completed,
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className={`mt-3 text-3xl font-bold ${item.color}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search patient, patient code, or reason..."
            className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Appointments Table */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="font-semibold text-gray-900">
            Appointment List
          </h2>
          <span className="text-sm text-gray-500">
            {filteredAppointments.length} records
          </span>
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <CalendarDays className="mx-auto mb-3 h-10 w-10 text-gray-300" />
            <h3 className="font-medium text-gray-700">
              No appointments found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try changing your search or status filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-medium">Patient</th>
                  <th className="px-5 py-4 font-medium">Date</th>
                  <th className="px-5 py-4 font-medium">Time</th>
                  <th className="px-5 py-4 font-medium">Reason</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredAppointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                          <UserRound className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {getPatientName(appointment.patient)}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {appointment.patient?.patient_code || "No patient code"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {formatDate(appointment.appointment_date)}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      <span className="inline-flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        {formatTime(appointment.appointment_time)}
                      </span>
                    </td>

                    <td className="max-w-[250px] px-5 py-4 text-gray-600">
                      {appointment.reason || "—"}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusClass(
                          appointment.status
                        )}`}
                      >
                        {appointment.status || "Unknown"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
