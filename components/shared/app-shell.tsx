import Link from "next/link";
import { AppUser } from "@/types/domain";

const nav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/students", label: "Students" },
  { href: "/alerts", label: "Alerts" },
  { href: "/communications", label: "Communications" },
  { href: "/meetings", label: "Meetings" },
  { href: "/analytics", label: "Analytics" },
  { href: "/settings", label: "Settings" },
];

type AppShellProps = {
  user: AppUser;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function AppShell({ user, title, subtitle, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-[240px_1fr]">
        <aside className="border-r border-slate-200 bg-white px-4 py-6">
          <div className="mb-6">
            <h1 className="text-lg font-bold">Counselor AI OS</h1>
            <p className="text-xs text-slate-500">{user.schoolName}</p>
          </div>
          <nav className="space-y-1">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="px-6 py-6">
          <header className="mb-6 flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">{title}</h2>
              {subtitle ? <p className="text-sm text-slate-600">{subtitle}</p> : null}
            </div>
            <div className="rounded-md bg-slate-100 px-3 py-2 text-xs text-slate-700">
              Signed in as {user.name} ({user.role})
            </div>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
