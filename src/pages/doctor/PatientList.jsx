
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, RefreshCw, Users, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

import { patientService } from "../../services/patientService";

function calculateAge(dateOfBirth) {
  if (!dateOfBirth) return "—";

  const birthDate = new Date(dateOfBirth);
  if (Number.isNaN(birthDate.getTime())) return "—";

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const birthdayPending =
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate());

  if (birthdayPending) age--;

  return age >= 0 ? `${age} yrs` : "—";
}

function PatientAvatar({ patient }) {
  const [imageError, setImageError] = useState(false);

  const initials = `${patient.first_name?.[0] || ""}${
    patient.last_name?.[0] || ""
  }`.toUpperCase();

  const imageUrl = patient.profile_image
    ? `${import.meta.env.VITE_API_BASE_URL}/assets/${patient.profile_image}`
    : null;

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
      {imageUrl && !imageError ? (
        <img
          src={imageUrl}
          alt={`${patient.first_name || ""} ${patient.last_name || ""}`}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        initials || <UserRound size={18} />
      )}
    </div>
  );
}

export default function PatientList() {
  const [search, setSearch] = useState("");

  const {
    data: patients = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: patientService.getAll,
    staleTime: 30_000,
  });

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return patients;

    return patients.filter((patient) => {
      const fullName =
        `${patient.first_name || ""} ${patient.last_name || ""}`.toLowerCase();

      return (
        fullName.includes(query) ||
        patient.patient_code?.toLowerCase().includes(query) ||
        patient.phone_no?.toLowerCase().includes(query)
      );
    });
  }, [patients, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Patients
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Browse and manage patient records.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3">
          <Users size={20} className="text-blue-600" />
          <span className="text-sm font-medium text-slate-700">
            {patients.length} patients
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, patient code, or phone..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
        >
          <RefreshCw
            size={16}
            className={isFetching ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <RefreshCw
            size={24}
            className="mx-auto animate-spin text-blue-600"
          />
          <p className="mt-4 text-sm text-slate-500">
            Fetching patient records from Directus...
          </p>
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-semibold text-red-800">
            Unable to load patients
          </h2>
          <p className="mt-2 text-sm text-red-700">
            {error?.response?.data?.errors?.[0]?.message ||
              error?.message ||
              "An unexpected error occurred."}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800"
          >
            Try again
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-slate-900">
              Patient Directory
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Showing {filteredPatients.length} of {patients.length} patients
            </p>
          </div>

          {filteredPatients.length === 0 ? (
            <div className="p-10 text-center">
              <Users size={28} className="mx-auto text-slate-300" />
              <p className="mt-4 font-medium text-slate-700">
                No patients found
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Try changing your search.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-3 font-medium">Patient</th>
                    <th className="px-5 py-3 font-medium">Patient Code</th>
                    <th className="px-5 py-3 font-medium">Age / Gender</th>
                    <th className="px-5 py-3 font-medium">Blood Group</th>
                    <th className="px-5 py-3 font-medium">Location</th>
                    <th className="px-5 py-3 font-medium">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <PatientAvatar patient={patient} />
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {patient.first_name} {patient.last_name}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {patient.email || "No email"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {patient.patient_code || "—"}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {calculateAge(patient.date_of_birth)} /{" "}
                        {patient.gender || "—"}
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
                          {patient.blood_group || "—"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {[patient.city, patient.state]
                          .filter(Boolean)
                          .join(", ") || "—"}
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
          )}
        </section>
      )}
    </div>
  );
}
