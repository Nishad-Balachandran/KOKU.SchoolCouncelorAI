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
      <div className="relative overflow-hidden rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 via-white to-blue-50 p-5 shadow-sm">
        <div className="pointer-events-none absolute -left-12 top-0 h-28 w-28 rounded-full bg-indigo-300/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-0 h-24 w-24 rounded-full bg-blue-300/40 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">Dashboard Overview</p>
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-300 bg-indigo-100 px-3 py-1 text-[11px] font-semibold text-indigo-800">
            <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-600" />
            Live Risk Monitor
          </span>
        </div>
      </div>

      {data.usingMockData ? (
        <p className="mb-4 mt-4 rounded-lg border border-orange-300 bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-3 text-xs font-medium text-orange-900 shadow-sm">
          Database unavailable. Showing mock demo data.
        </p>
      ) : null}

      <div className="mb-5 mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card title="Students" value={String(data.cards.students)} variant="blue" />
        <Card title="Open Alerts" value={String(data.cards.openAlerts)} variant="orange" />
        <Card title="Tasks Due" value={String(data.cards.tasksDue)} variant="purple" />
        <Card title="High Risk" value={String(data.cards.highRisk)} variant="rose" />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-50 p-5 shadow-sm backdrop-blur xl:col-span-2">
          <div className="pointer-events-none absolute right-4 top-4 h-20 w-20 rounded-full bg-blue-200/40 blur-2xl" />
          <h3 className="relative mb-4 text-sm font-bold uppercase tracking-[0.16em] text-slate-800">Daily Priority Tasks</h3>
          <div className="space-y-2">
            {data.tasks.map((task) => (
              <article
                key={task.id}
                className="rounded-xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-blue-300/60 hover:shadow-md"
              >
                <div className="mb-1 flex items-start justify-between gap-2">
                  <p className="flex-1 text-sm font-bold text-slate-900">{task.title}</p>
                  <span className="inline-block rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">Due Soon</span>
                </div>
                <p className="text-xs text-slate-600">📌 {task.studentName}</p>
                <p className="mt-1 text-xs font-medium text-slate-500">📅 {task.dueDate}</p>
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

function Card({
  title,
  value,
  variant,
}: {
  title: string;
  value: string;
  variant: "blue" | "orange" | "purple" | "rose";
}) {
  const styles: Record<string, { bg: string; glow: string; text: string }> = {
    blue: {
      bg: "from-blue-50 to-blue-100/50",
      glow: "bg-blue-300/40",
      text: "text-blue-900",
    },
    orange: {
      bg: "from-orange-50 to-orange-100/50",
      glow: "bg-orange-300/40",
      text: "text-orange-900",
    },
    purple: {
      bg: "from-purple-50 to-purple-100/50",
      glow: "bg-purple-300/40",
      text: "text-purple-900",
    },
    rose: {
      bg: "from-rose-50 to-rose-100/50",
      glow: "bg-rose-300/40",
      text: "text-rose-900",
    },
  };
  const style = styles[variant];
  return (
    <article className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br ${style.bg} p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg`}>
      <div className={`pointer-events-none absolute -right-6 -top-8 h-20 w-20 rounded-full ${style.glow} blur-2xl transition-opacity duration-200 group-hover:opacity-100`} />
      <p className="relative text-xs font-bold uppercase tracking-[0.16em] text-slate-600">{title}</p>
      <p className={`relative mt-3 text-4xl font-black ${style.text}`}>{value}</p>
    </article>
  );
}
