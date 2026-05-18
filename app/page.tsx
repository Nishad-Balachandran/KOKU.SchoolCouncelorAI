import Link from "next/link";

const highlights = [
  {
    title: "Student Risk Detection",
    copy: "Identify attendance decline, grade drops, and missed interventions with explainable risk signals.",
  },
  {
    title: "AI Counselor Copilot",
    copy: "Generate parent messages, intervention plans, and meeting agendas with mandatory human review.",
  },
  {
    title: "Case Management",
    copy: "Track interventions, follow-ups, and communication history in one counseling workflow hub.",
  },
  {
    title: "Compliance and Audit",
    copy: "Record AI generation, approvals, and decisions in audit logs for FERPA-aware governance.",
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute -left-16 top-10 h-72 w-72 rounded-full bg-cyan-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-8 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
        <header className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-8 backdrop-blur">
          <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-200">
            AI Operating System for School Counseling Departments
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl">
            Counselor AI OS for NorthWest High School
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-200 sm:text-base">
            Empower counselors to spend less time on admin and more time supporting students through proactive risk detection,
            intelligent copilots, intervention tracking, parent communication workflows, and compliance-safe audit trails.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-cyan-200"
            >
              Open Dashboard
            </Link>
            <Link
              href="/students"
              className="rounded-lg border border-slate-500 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-800"
            >
              Browse Students
            </Link>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2">
          {highlights.map((item) => (
            <article key={item.title} className="rounded-xl border border-slate-700/60 bg-slate-900/70 p-5 shadow-lg backdrop-blur">
              <h2 className="text-lg font-bold text-white">{item.title}</h2>
              <p className="mt-2 text-sm text-slate-300">{item.copy}</p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6 backdrop-blur">
          <h3 className="text-xl font-bold text-white">Built for Real Counselor Workflows</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-200 sm:grid-cols-2 lg:grid-cols-3">
            <p>Academic advising and graduation tracking</p>
            <p>Mental health triage and crisis escalation support</p>
            <p>Parent communication with review-first messaging</p>
            <p>Career and college planning readiness</p>
            <p>Attendance intervention and caseload prioritization</p>
            <p>FERPA-aware notes, exports, and AI audit logging</p>
          </div>
        </section>
      </div>
    </main>
  );
}
