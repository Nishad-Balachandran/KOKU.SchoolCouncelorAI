import { AppShell } from "@/components/shared/app-shell";
import { getCurrentUser } from "@/lib/auth/mock-session";

export default async function CommunicationsPage() {
  const user = await getCurrentUser();

  return (
    <AppShell user={user} title="Communications" subtitle="Parent communication center with draft-first AI assistance.">
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm text-slate-700">MVP placeholder: draft messages, translation, approval, send history.</p>
      </section>
    </AppShell>
  );
}
