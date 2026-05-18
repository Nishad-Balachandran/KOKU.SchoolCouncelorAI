import Link from "next/link";

const routes = [
  "/dashboard",
  "/students",
  "/alerts",
  "/communications",
  "/meetings",
  "/analytics",
  "/settings",
];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 px-6 py-12">
      <header className="space-y-3">
        <p className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
          Step 4 Complete
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Counselor AI OS</h1>
        <p className="text-sm text-slate-600">
          Base app scaffold is ready. Next step is route scaffolding and module implementation.
        </p>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Planned MVP Routes</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {routes.map((route) => (
            <li key={route} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
              {route}
            </li>
          ))}
        </ul>
      </section>

      <div>
        <Link href="/dashboard" className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
          Go to Dashboard (next step)
        </Link>
      </div>
    </main>
  );
}
