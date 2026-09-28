import { Bell, Search } from "lucide-react";

function Topbar({ title, role }) {
  const isDoctor = role === "doctor";

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      {/* Page title */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          {title}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Welcome back, {isDoctor ? "Dr. Sharma" : "Rahul"}.
        </p>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-5">
        <button
          type="button"
          aria-label="Search"
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
        >
          <Search size={20} />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600" />
        </button>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
            {isDoctor ? "DS" : "RK"}
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-900">
              {isDoctor ? "Dr. Sharma" : "Rahul Kumar"}
            </p>
            <p className="text-xs capitalize text-slate-500">
              {role}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;