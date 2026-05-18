import { AppShell } from "@/components/shared/app-shell";
import { getCurrentUser } from "@/lib/auth/mock-session";

export default async function AnalyticsPage() {
  const user = await getCurrentUser();

  return (
    <AppShell user={user} title="Analytics" subtitle="Workload, risk, and intervention outcome metrics.">
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm text-slate-700">MVP placeholder: workload dashboard, risk trends, intervention outcomes, and time-saved estimate.</p>
      </section>
    </AppShell>
  );
}
