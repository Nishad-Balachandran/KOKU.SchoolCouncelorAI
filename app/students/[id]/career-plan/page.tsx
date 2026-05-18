import { AppShell } from "@/components/shared/app-shell";
import { getCurrentUser } from "@/lib/auth/mock-session";

export default async function StudentCareerPlanPage() {
  const user = await getCurrentUser();

  return (
    <AppShell user={user} title="Career Plan" subtitle="College and career planning module placeholder.">
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm text-slate-700">MVP placeholder: career pathways, FAFSA milestones, scholarships, and application tracking.</p>
      </section>
    </AppShell>
  );
}
