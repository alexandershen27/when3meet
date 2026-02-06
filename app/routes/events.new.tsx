import { Form, redirect } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { createEvent } from "~/models/event.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const eventName = String(formData.get("eventName") ?? "");
  const dateRange = String(formData.get("dateRange") ?? "");
  const timeWindow = String(formData.get("timeWindow") ?? "");

  if (!eventName.trim()) {
    return { error: "Event name is required" };
  }

  // Parse date range (simplified - expects "Dec 1 - Dec 7" format)
  const [startStr, endStr] = dateRange.split("-").map((s) => s.trim());
  const start = startStr ? new Date(startStr) : new Date();
  const end = endStr ? new Date(endStr) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // Parse time window (simplified - expects "9:00 AM - 5:00 PM" format)
  const [timeStart, timeEnd] = timeWindow.split("-").map((s) => s.trim());
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const eventId = await createEvent({
    name: eventName,
    dateRange: { start, end },
    timeWindow: {
      start: timeStart || "09:00",
      end: timeEnd || "17:00",
    },
    timezone,
  });

  return redirect(`/events/${eventId}`);
}

export default function NewEvent() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
        <h1 className="text-2xl font-bold text-slate-900">Create Event</h1>
        <p className="mt-1 text-slate-600">
          Enter event details and select date range and time windows.
        </p>

        <Form method="post" className="mt-8 space-y-6">
          <div>
            <label htmlFor="eventName" className="block text-sm font-medium text-slate-700">
              Event Name
            </label>
            <input
              id="eventName"
              name="eventName"
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="e.g., Team Standup"
            />
          </div>

          <div>
            <label htmlFor="dateRange" className="block text-sm font-medium text-slate-700">
              Date Range
            </label>
            <input
              id="dateRange"
              name="dateRange"
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="e.g., Dec 1 - Dec 7"
            />
          </div>

          <div>
            <label htmlFor="timeWindow" className="block text-sm font-medium text-slate-700">
              Time Window
            </label>
            <input
              id="timeWindow"
              name="timeWindow"
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="e.g., 9:00 AM - 5:00 PM"
            />
          </div>

          <p className="text-sm text-slate-500">
            Time zone: <span id="timezone">{Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
          </p>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Create Event
            </button>
          </div>
        </Form>
      </div>
    </main>
  );
}
