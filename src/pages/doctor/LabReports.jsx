
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  RefreshCw,
  FlaskConical,
  FileText,
  UserRound,
  CalendarDays,
  Eye,
} from "lucide-react";
import { labReportService } from "../../services/labReportService";

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

  if (value === "pending") {
    return "bg-yellow-100 text-yellow-700";
  }

  if (value === "in_progress" || value === "in progress") {
    return "bg-blue-100 text-blue-700";
  }

  if (value === "cancelled" || value === "canceled") {
    return "bg-red-100 text-red-700";
  }

  return "bg-gray-100 text-gray-700";
}

export default function LabReports() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState(null);

  const {
    data: reports = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["lab-reports"],
    queryFn: () => labReportService.getAll(),
  });

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const patientName = getPatientName(report.patient);
      const patientCode = report.patient?.patient_code || "";
      const testName = report.test_name || "";
      const status = String(report.status || "").toLowerCase();

      const searchText = search.toLowerCase();

      const matchesSearch =
        patientName.toLowerCase().includes(searchText) ||
        patientCode.toLowerCase().includes(searchText) ||
        testName.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "all" || status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [reports, search, statusFilter]);

  const counts = useMemo(() => {
    return {
      total: reports.length,
      completed: reports.filter(
        (report) => String(report.status).toLowerCase() === "completed"
      ).length,
      pending: reports.filter(
        (report) => String(report.status).toLowerCase() === "pending"
      ).length,
      inProgress: reports.filter((report) => {
        const status = String(report.status || "").toLowerCase();
        return status === "in_progress" || status === "in progress";
      }).length,
    };
  }, [reports]);

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-center">
          <RefreshCw className="mx-auto mb-3 h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading lab reports...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-700">
          Failed to load lab reports
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
          <h1 className="text-2xl font-bold text-gray-900">Lab Reports</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage patient laboratory reports.
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
            label: "Total Reports",
            value: counts.total,
            color: "text-blue-600",
            icon: FileText,
          },
          {
            label: "Completed",
            value: counts.completed,
            color: "text-green-600",
            icon: FlaskConical,
          },
          {
            label: "Pending",
            value: counts.pending,
            color: "text-yellow-600",
            icon: CalendarDays,
          },
          {
            label: "In Progress",
            value: counts.inProgress,
            color: "text-purple-600",
            icon: RefreshCw,
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{item.label}</p>
                <Icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <p className={`mt-3 text-3xl font-bold ${item.color}`}>
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search patient, patient code, or test..."
            className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500"
        >
          <option value="all">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Reports Table */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="font-semibold text-gray-900">Report List</h2>
          <span className="text-sm text-gray-500">
            {filteredReports.length} records
          </span>
        </div>

        {filteredReports.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <FlaskConical className="mx-auto mb-3 h-10 w-10 text-gray-300" />
            <h3 className="font-medium text-gray-700">No lab reports found</h3>
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
                  <th className="px-5 py-4 font-medium">Test Name</th>
                  <th className="px-5 py-4 font-medium">Test Date</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 font-medium">Result</th>
                  <th className="px-5 py-4 font-medium">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="transition hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                          <UserRound className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {getPatientName(report.patient)}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {report.patient?.patient_code || "No patient code"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 font-medium text-gray-700">
                      {report.test_name || "—"}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {formatDate(report.test_date)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusClass(
                          report.status
                        )}`}
                      >
                        {String(report.status || "Unknown").replace(/_/g, " ")}
                      </span>
                    </td>

                    <td className="max-w-[220px] px-5 py-4 text-gray-600">
                      <p className="line-clamp-2">
                        {report.result_summary || "No result available"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Report Details Modal */}
      {selectedReport && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedReport(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-modal-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="report-modal-title"
                  className="text-xl font-bold text-gray-900"
                >
                  Lab Report Details
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Report ID: {selectedReport.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedReport(null)}
                className="rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100"
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase text-gray-500">
                  Patient
                </p>
                <p className="mt-1 font-medium text-gray-900">
                  {getPatientName(selectedReport.patient)}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedReport.patient?.patient_code || "No patient code"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-500">
                  Test Name
                </p>
                <p className="mt-1 font-medium text-gray-900">
                  {selectedReport.test_name || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-500">
                  Test Date
                </p>
                <p className="mt-1 text-gray-900">
                  {formatDate(selectedReport.test_date)}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-500">
                  Status
                </p>
                <span
                  className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusClass(
                    selectedReport.status
                  )}`}
                >
                  {String(selectedReport.status || "Unknown").replace(/_/g, " ")}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs font-medium uppercase text-gray-500">
                Result Summary
              </p>
              <p className="mt-2 whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-700">
                {selectedReport.result_summary || "No result summary available."}
              </p>
            </div>

            {selectedReport.notes && (
              <div className="mt-5">
                <p className="text-xs font-medium uppercase text-gray-500">
                  Notes
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-700">
                  {selectedReport.notes}
                </p>
              </div>
            )}

            {selectedReport.file && (
              <div className="mt-6">
                <a
                  href={`${import.meta.env.VITE_API_BASE_URL}/assets/${selectedReport.file}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                  <FileText className="h-4 w-4" />
                  Open Report File
                </a>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedReport(null)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
