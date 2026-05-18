import Link from "next/link";
import { Student } from "@/types/domain";

function riskClass(level: Student["riskLevel"]) {
  if (level === "CRITICAL") return "text-red-700";
  if (level === "HIGH") return "text-orange-700";
  if (level === "MEDIUM") return "text-amber-700";
  return "text-emerald-700";
}

type StudentListTableProps = {
  students: Student[];
};

export function StudentListTable({ students }: StudentListTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Student</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Grade</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">GPA</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Attendance</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Risk</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 text-sm">
                <Link href={`/students/${student.id}`} className="font-semibold text-slate-900 hover:underline">
                  {student.firstName} {student.lastName}
                </Link>
              </td>
              <td className="px-4 py-3 text-sm text-slate-700">{student.gradeLevel}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{student.gpa.toFixed(1)}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{student.attendanceRate}%</td>
              <td className={`px-4 py-3 text-sm font-semibold ${riskClass(student.riskLevel)}`}>{student.riskLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
