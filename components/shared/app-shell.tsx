import Link from "next/link";
import { AppUser } from "@/types/domain";
import { BackButton } from "@/components/shared/back-button";

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 md:grid-cols-[240px_1fr]">
        <aside className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm md:border-b-0 md:border-r md:px-4 md:py-6">
          <div className="mb-4 md:mb-6">
            <h1 className="text-lg font-bold text-slate-900">Counselor AI OS</h1>
            <p className="text-xs text-slate-500">{user.schoolName}</p>
          </div>
          <nav className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-1 md:space-y-1">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="block rounded-md px-3 py-2 text-sm text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700">
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="px-4 py-5 sm:px-6 sm:py-6">
          <header className="mb-6 flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
              {subtitle ? <p className="text-sm text-slate-600">{subtitle}</p> : null}
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700"
              >
                Home
              </Link>
              <BackButton />
              <div className="rounded-md bg-indigo-100 px-3 py-2 text-xs font-semibold text-indigo-800">
                Signed in as {user.name} ({user.role})
              </div>
            </div>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
