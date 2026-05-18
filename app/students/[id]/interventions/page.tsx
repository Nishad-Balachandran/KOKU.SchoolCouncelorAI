import { AppShell } from "@/components/shared/app-shell";
import { getCurrentUser } from "@/lib/auth/mock-session";

export default async function StudentInterventionsPage() {
  const user = await getCurrentUser();

  return (
    <AppShell user={user} title="Student Interventions" subtitle="Intervention management will be connected to database records in Step 7.">
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm text-slate-700">MVP placeholder: intervention list, status transitions, and outcome logging.</p>
      </section>
    </AppShell>
  );
}
