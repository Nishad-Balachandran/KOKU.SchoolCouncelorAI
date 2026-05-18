import { CopilotPanel } from "@/components/copilot/copilot-panel";
import { RiskAlertList } from "@/components/alerts/risk-alert-list";
import { AppShell } from "@/components/shared/app-shell";
import { getDashboardData } from "@/lib/db/queries";
import { getCurrentUser } from "@/lib/auth/mock-session";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const data = await getDashboardData();

  return (
    <AppShell
      user={user}
      title="Counselor Dashboard"
      subtitle="Prioritized view of caseload risk, follow-ups, and intervention actions."
    >
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-r from-cyan-100/60 via-white to-amber-100/60 p-4 shadow-sm">
        <div className="pointer-events-none absolute -left-10 top-0 h-24 w-24 rounded-full bg-cyan-300/40 blur-2xl" />
        <div className="pointer-events-none absolute -right-8 bottom-0 h-20 w-20 rounded-full bg-amber-300/40 blur-2xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Realtime Operations Grid</p>
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/50 bg-cyan-100/70 px-3 py-1 text-[11px] font-semibold text-cyan-800">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-500" />
            Live Risk Monitor
          </span>
        </div>
      </div>

      {data.usingMockData ? (
        <p className="mb-4 mt-4 rounded-lg border border-amber-300 bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-3 text-xs font-medium text-amber-900 shadow-sm">
          Database unavailable. Showing mock demo data.
        </p>
      ) : null}

      <div className="mb-5 mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card title="Students" value={String(data.cards.students)} />
        <Card title="Open Alerts" value={String(data.cards.openAlerts)} />
        <Card title="Tasks Due" value={String(data.cards.tasksDue)} />
        <Card title="High Risk" value={String(data.cards.highRisk)} />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur xl:col-span-2">
          <div className="pointer-events-none absolute right-4 top-4 h-20 w-20 rounded-full bg-cyan-200/50 blur-2xl" />
          <h3 className="relative mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-700">Daily Priority Tasks</h3>
          <div className="space-y-2">
            {data.tasks.map((task) => (
              <article
                key={task.id}
                className="rounded-xl border border-slate-200/80 bg-gradient-to-r from-white to-slate-50 p-3 transition-transform duration-200 hover:-translate-y-0.5 hover:border-cyan-300/60"
              >
                <p className="text-base font-semibold text-slate-900">{task.title}</p>
                <p className="text-xs text-slate-600">Student: {task.studentName}</p>
                <p className="text-xs font-medium text-slate-500">Due: {task.dueDate}</p>
              </article>
            ))}
          </div>
        </section>

        <CopilotPanel schoolId={user.schoolId} userId={user.id} />
      </div>

      <div className="mt-4">
        <RiskAlertList alerts={data.alerts} />
      </div>
    </AppShell>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
      <div className="pointer-events-none absolute -right-6 -top-8 h-20 w-20 rounded-full bg-cyan-200/60 blur-2xl transition-opacity duration-200 group-hover:opacity-90" />
      <p className="relative text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{title}</p>
      <p className="relative mt-2 text-3xl font-black text-slate-900">{value}</p>
    </article>
  );
}
