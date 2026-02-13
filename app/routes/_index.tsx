import { Link } from "@remix-run/react";
import { routes } from "~/lib/routes";

export default function Index() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          When3Meet
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Find the best time for everyone to meet. Mobile-first, time-zone aware,
          with calendar integration.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            to={routes.newEvent()}
            className="rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Create Event
          </Link>
          <Link
            to={routes.events()}
            className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            My Events
          </Link>
        </div>
      </div>
    </main>
  );
}
