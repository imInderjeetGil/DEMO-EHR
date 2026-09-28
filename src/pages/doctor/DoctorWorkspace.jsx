import { useParams } from "react-router-dom";

function DoctorWorkspace() {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">
        Doctor Workspace
      </h1>

      <p className="mt-2 text-slate-500">
        Patient ID: {id}
      </p>

      <p className="mt-2 text-slate-500">
        Patient details, previous prescriptions, and consultation
        tools will appear here.
      </p>
    </div>
  );
}

export default DoctorWorkspace;