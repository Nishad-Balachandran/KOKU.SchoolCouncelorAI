import { Intervention } from "@/types/domain";

function statusColor(status: Intervention["status"]) {
  if (status === "COMPLETED") return "bg-emerald-100 text-emerald-700";
  if (status === "ACTIVE") return "bg-blue-100 text-blue-700";
  return "bg-slate-100 text-slate-700";
}

type InterventionTimelineProps = {
  items: Intervention[];
};

export function InterventionTimeline({ items }: InterventionTimelineProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-700">Intervention Timeline</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-lg border border-slate-200 p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-500">{item.tier}</p>
              </div>
              <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${statusColor(item.status)}`}>
                {item.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-700">{item.summary}</p>
            {item.dueDate ? <p className="mt-2 text-xs text-slate-500">Due: {item.dueDate}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
