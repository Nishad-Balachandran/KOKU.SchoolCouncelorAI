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
      {data.usingMockData ? (
        <p className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
          Database unavailable. Showing mock demo data.
        </p>
      ) : null}

      <div className="mb-4 grid gap-4 md:grid-cols-4">
        <Card title="Students" value={String(data.cards.students)} />
        <Card title="Open Alerts" value={String(data.cards.openAlerts)} />
        <Card title="Tasks Due" value={String(data.cards.tasksDue)} />
        <Card title="High Risk" value={String(data.cards.highRisk)} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-700">Daily Priority Tasks</h3>
          <div className="space-y-2">
            {data.tasks.map((task) => (
              <article key={task.id} className="rounded-lg border border-slate-200 p-3">
                <p className="text-sm font-semibold text-slate-900">{task.title}</p>
                <p className="text-xs text-slate-600">Student: {task.studentName}</p>
                <p className="text-xs text-slate-500">Due: {task.dueDate}</p>
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
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
    </article>
  );
}
