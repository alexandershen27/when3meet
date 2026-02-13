import { Outlet, Link } from "@remix-run/react";
import { routes } from "~/lib/routes";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <Link to={routes.home()} className="text-lg font-semibold text-indigo-600 hover:text-indigo-500">
            ← When3Meet
          </Link>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
