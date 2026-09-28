
import { Clock3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function StatusBadge({ status }) {
  const styles = {
    Completed: "bg-emerald-50 text-emerald-700",
    "In Progress": "bg-blue-50 text-blue-700",
    Upcoming: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

export default function TodayAppointments({ appointments }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="font-semibold text-slate-900">
            Today's Appointments
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Your upcoming and recent consultations
          </p>
        </div>

        <Link
          to="/doctor/appointments"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View all
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="divide-y divide-slate-100">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
                {appointment.patientName
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              <div>
                <p className="font-medium text-slate-900">
                  {appointment.patientName}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {appointment.type}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:justify-end">
              <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                <Clock3 size={15} />
                {appointment.time}
              </span>

              <StatusBadge status={appointment.status} />

              <Link
                to={`/doctor/patients/${appointment.patientId}/workspace`}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Open
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
