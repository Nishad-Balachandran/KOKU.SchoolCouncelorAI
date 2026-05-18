import { AppShell } from "@/components/shared/app-shell";
import { StudentListTable } from "@/components/students/student-list-table";
import { getStudents } from "@/lib/db/queries";
import { getCurrentUser } from "@/lib/auth/mock-session";

export default async function StudentsPage() {
  const user = await getCurrentUser();
  const { students, usingMockData } = await getStudents();

  return (
    <AppShell user={user} title="Students" subtitle="Caseload roster with risk, attendance, and academic context.">
      {usingMockData ? (
        <p className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
          Database unavailable. Showing mock demo data.
        </p>
      ) : null}

      <StudentListTable students={students} />
    </AppShell>
  );
}
