import { notFound } from "next/navigation";
import { CopilotPanel } from "@/components/copilot/copilot-panel";
import { InterventionTimeline } from "@/components/interventions/intervention-timeline";
import { AppShell } from "@/components/shared/app-shell";
import { getRiskAlerts, getStudentById } from "@/lib/db/queries";
import { getCurrentUser } from "@/lib/auth/mock-session";

type StudentProfilePageProps = {
  params: Promise<{ id: string }>;
};

export default async function StudentProfilePage({ params }: StudentProfilePageProps) {
  const user = await getCurrentUser();
  const { id } = await params;
  const { student, usingMockData } = await getStudentById(id);

  if (!student) {
    notFound();
  }

  const allAlerts = await getRiskAlerts();
  const alerts = allAlerts.filter((alert) => alert.studentId === student.id);

  return (
    <AppShell user={user} title={`${student.firstName} ${student.lastName}`} subtitle={`Grade ${student.gradeLevel} student profile`}>
      {usingMockData ? (
        <p className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
          Database unavailable. Showing mock demo data.
        </p>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-700">Student Snapshot</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Snapshot label="GPA" value={student.gpa.toFixed(1)} />
            <Snapshot label="Attendance" value={`${student.attendanceRate}%`} />
            <Snapshot label="Behavior Incidents" value={String(student.behaviorIncidentCount)} />
            <Snapshot label="Risk Level" value={student.riskLevel} />
          </div>

          <h4 className="mt-5 text-sm font-semibold text-slate-900">AI Student Summary</h4>
          <p className="mt-2 rounded-md bg-slate-50 p-3 text-sm text-slate-700">{student.aiSummary}</p>
          <p className="mt-2 text-xs text-slate-500">
            Draft output only. Human review required before saving to official records.
          </p>

          <h4 className="mt-5 text-sm font-semibold text-slate-900">Guardian Contacts</h4>
          <ul className="mt-2 space-y-2">
            {student.guardians.map((guardian, index) => (
              <li key={`${guardian.name}-${index}`} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
                {guardian.name} ({guardian.relationship})
                {guardian.email ? <span className="ml-2 text-slate-500">{guardian.email}</span> : null}
                {guardian.phone ? <span className="ml-2 text-slate-500">{guardian.phone}</span> : null}
              </li>
            ))}
          </ul>
        </section>

        <CopilotPanel
          studentName={`${student.firstName} ${student.lastName}`}
          studentId={student.id}
          schoolId={user.schoolId}
          userId={user.id}
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-700">Risk Alert Explanation</h3>
          <div className="space-y-2">
            {alerts.length === 0 ? (
              <p className="text-sm text-slate-600">No active alerts.</p>
            ) : (
              alerts.map((alert) => (
                <article key={alert.id} className="rounded-md border border-slate-200 p-3">
                  <p className="text-sm font-semibold text-slate-900">{alert.type}</p>
                  <p className="mt-1 text-sm text-slate-700">{alert.explanation}</p>
                  <p className="mt-1 text-xs text-slate-500">Recommendation: {alert.recommendation}</p>
                </article>
              ))
            )}
          </div>
        </section>

        <InterventionTimeline items={student.interventions} />
      </div>
    </AppShell>
  );
}

function Snapshot({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-md border border-slate-200 px-3 py-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
    </article>
  );
}
