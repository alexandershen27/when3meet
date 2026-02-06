import { useParams } from "@remix-run/react";

export default function ParticipantAvailability() {
  const { eventId } = useParams();

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold text-slate-900">Availability</h1>
        <p className="mt-1 text-slate-600">
          Select your available time slots. Event ID: {eventId}
        </p>

        <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6">
          <p className="text-center text-slate-500">
            Availability grid with 15-minute intervals will be rendered here.
            Heat-map overlap visualization coming soon.
          </p>
        </div>
      </div>
    </main>
  );
}
