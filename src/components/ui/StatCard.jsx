
import {
  CalendarDays,
  Users,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";

const iconMap = {
  CalendarDays,
  Users,
  ClipboardList,
  CheckCircle2,
};

const colorMap = {
  blue: "bg-blue-50 text-blue-600",
  violet: "bg-violet-50 text-violet-600",
  amber: "bg-amber-50 text-amber-600",
  emerald: "bg-emerald-50 text-emerald-600",
};

export default function StatCard({ stat }) {
  const Icon = iconMap[stat.icon];
  const colors = colorMap[stat.color];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {stat.label}
          </p>

          <h3 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            {stat.value}
          </h3>
        </div>

        <div className={`rounded-xl p-3 ${colors}`}>
          {Icon && <Icon size={22} />}
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        {stat.description}
      </p>
    </div>
  );
}
