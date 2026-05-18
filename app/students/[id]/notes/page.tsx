import { AppShell } from "@/components/shared/app-shell";
import { getCurrentUser } from "@/lib/auth/mock-session";

export default async function StudentNotesPage() {
  const user = await getCurrentUser();

  return (
    <AppShell user={user} title="Student Notes" subtitle="Notes workspace will be wired to Prisma in Step 7.">
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm text-slate-700">MVP placeholder: notes list, AI structured draft, and human approval controls.</p>
      </section>
    </AppShell>
  );
}
