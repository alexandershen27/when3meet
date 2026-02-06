import { Link } from "@remix-run/react";

export default function EventsDashboard() {
  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold text-slate-900">My Events</h1>
        <p className="mt-1 text-slate-600">
          View and manage events you have created.
        </p>

        <div className="mt-8">
          <div className="rounded-lg border border-slate-200 bg-white p-6 text-center">
            <p className="text-slate-500">No events yet.</p>
            <Link
              to="/events/new"
              className="mt-4 inline-block text-indigo-600 hover:text-indigo-500"
            >
              Create your first event →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
