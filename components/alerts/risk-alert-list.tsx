import Link from "next/link";
import { RiskAlert } from "@/types/domain";

function levelBadge(level: RiskAlert["level"]) {
  if (level === "CRITICAL") return "bg-red-100 text-red-700";
  if (level === "HIGH") return "bg-orange-100 text-orange-700";
  if (level === "MEDIUM") return "bg-amber-100 text-amber-700";
  return "bg-emerald-100 text-emerald-700";
}

type RiskAlertListProps = {
  alerts: RiskAlert[];
};

export function RiskAlertList({ alerts }: RiskAlertListProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-700">Student Risk Alerts</h3>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <article
            key={alert.id}
            className="rounded-xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 p-3 transition-transform duration-200 hover:-translate-y-0.5"
          >
            <div className="mb-1 flex items-center justify-between gap-2">
              <Link href={`/students/${alert.studentId}`} className="text-sm font-semibold text-slate-900 hover:underline">
                {alert.studentName}
              </Link>
              <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${levelBadge(alert.level)}`}>
                {alert.level}
              </span>
            </div>
            <p className="text-xs text-slate-500">{alert.type}</p>
            <p className="mt-2 text-sm text-slate-700">{alert.explanation}</p>
            <p className="mt-2 text-xs text-slate-600">Recommended: {alert.recommendation}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
