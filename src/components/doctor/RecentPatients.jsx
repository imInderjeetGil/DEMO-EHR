
import { ArrowRight, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

export default function RecentPatients({ patients }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="font-semibold text-slate-900">
            Recent Patients
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Patients you've recently attended
          </p>
        </div>

        <Link
          to="/doctor/patients"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View all
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[580px] text-left">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3 font-medium">Patient</th>
              <th className="px-5 py-3 font-medium">Last Visit</th>
              <th className="px-5 py-3 font-medium">Condition</th>
              <th className="px-5 py-3 font-medium">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-slate-50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                      <UserRound size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {patient.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {patient.age} years · {patient.gender}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {patient.lastVisit}
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                    {patient.condition}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <Link
                    to={`/doctor/patients/${patient.id}/workspace`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
