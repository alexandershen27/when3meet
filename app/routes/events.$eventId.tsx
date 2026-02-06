import { Link, useParams, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const origin = url.origin;
  return { origin };
}

export default function EventConfirmation() {
  const { eventId } = useParams();
  const { origin } = useLoaderData<typeof loader>();

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold text-slate-900">Event Created</h1>
        <p className="mt-1 text-slate-600">
          Share this link with participants to collect their availability.
        </p>

        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-6">
          <p className="text-sm font-medium text-slate-700">Shareable Link</p>
          <p className="mt-2 break-all font-mono text-sm text-indigo-600">
            {`${origin}/events/${eventId}/availability`}
          </p>
          <Link
            to={`/events/${eventId}/availability`}
            className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500"
          >
            Open Availability Grid
          </Link>
        </div>
      </div>
    </main>
  );
}
