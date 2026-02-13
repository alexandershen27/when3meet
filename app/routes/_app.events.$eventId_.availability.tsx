import { useState, useCallback, useRef } from "react";
import { useFetcher, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { ObjectId } from "mongodb";
import { getEventById } from "~/models/event.server";
import { findOrCreateParticipant } from "~/models/participant.server";
import {
  upsertAvailability,
  getAvailabilitiesByEventId,
} from "~/models/availability.server";
import {
  generateTimeSlots,
  generateDates,
  slotId,
  formatTime,
  formatDateHeader,
} from "~/lib/slots";

export async function loader({ params }: LoaderFunctionArgs) {
  const event = await getEventById(params.eventId!);
  if (!event) throw new Response("Event not found", { status: 404 });

  const dates = generateDates(event.dateRange.start, event.dateRange.end);
  const timeSlots = generateTimeSlots(event.timeWindow.start, event.timeWindow.end);
  const availabilities = await getAvailabilitiesByEventId(event._id!);

  const heatMap: Record<string, number> = {};
  for (const a of availabilities) {
    for (const s of a.slots) {
      heatMap[s] = (heatMap[s] || 0) + 1;
    }
  }

  return json({
    event: {
      name: event.name,
      timezone: event.timezone,
      isLocked: event.isLocked,
    },
    dates,
    timeSlots,
    heatMap,
    totalParticipants: availabilities.length,
  });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").trim();
  const slotsRaw = String(formData.get("slots") ?? "");

  if (!name) return json({ error: "Name is required" }, { status: 400 });

  const eventOid = new ObjectId(params.eventId!);
  const participant = await findOrCreateParticipant(eventOid, name);
  const slots = slotsRaw ? slotsRaw.split(",") : [];

  await upsertAvailability({
    eventId: eventOid,
    participantId: participant._id!,
    slots,
  });

  return json({ success: true });
}

export default function ParticipantAvailability() {
  const { event, dates, timeSlots, heatMap, totalParticipants } =
    useLoaderData<typeof loader>();
  const fetcher = useFetcher<{ success?: boolean; error?: string }>();

  const [name, setName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const isDragging = useRef(false);
  const dragMode = useRef<"add" | "remove">("add");

  const showConfirmation = fetcher.data?.success === true;
  const isSubmitting = fetcher.state !== "idle";

  const handlePointerDown = useCallback(
    (id: string) => {
      if (event.isLocked) return;
      isDragging.current = true;
      dragMode.current = selected.has(id) ? "remove" : "add";
      setSelected((prev) => {
        const next = new Set(prev);
        dragMode.current === "add" ? next.add(id) : next.delete(id);
        return next;
      });
    },
    [selected, event.isLocked]
  );

  const handlePointerEnter = useCallback(
    (id: string) => {
      if (!isDragging.current || event.isLocked) return;
      setSelected((prev) => {
        const next = new Set(prev);
        dragMode.current === "add" ? next.add(id) : next.delete(id);
        return next;
      });
    },
    [event.isLocked]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  function heatColor(id: string): string {
    if (selected.has(id)) return "bg-indigo-400";
    const count = heatMap[id] || 0;
    if (totalParticipants === 0 || count === 0) return "bg-white";
    const ratio = count / totalParticipants;
    if (ratio >= 0.75) return "bg-emerald-400";
    if (ratio >= 0.5) return "bg-emerald-300";
    if (ratio >= 0.25) return "bg-emerald-200";
    return "bg-emerald-100";
  }

  if (!nameSubmitted) {
    return (
      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <h1 className="text-2xl font-bold text-slate-900">{event.name}</h1>
          <p className="mt-1 text-slate-600">Enter your name to get started.</p>
          <div className="mt-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              onClick={() => name.trim() && setNameSubmitted(true)}
              disabled={!name.trim()}
              className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className="px-4 py-8 sm:px-6 lg:px-8"
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{event.name}</h1>
            <p className="mt-1 text-sm text-slate-500">
              Responding as <span className="font-medium text-slate-700">{name}</span>
              {" · "}
              {event.timezone}
            </p>
          </div>
          {totalParticipants > 0 && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
              {totalParticipants} response{totalParticipants !== 1 && "s"}
            </span>
          )}
        </div>

        {event.isLocked && (
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            This event is locked. Availability can no longer be modified.
          </div>
        )}

        {showConfirmation && (
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Your availability has been saved.
          </div>
        )}

        {totalParticipants > 0 && (
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <span>Less</span>
            <span className="inline-block h-4 w-4 rounded border border-slate-200 bg-emerald-100" />
            <span className="inline-block h-4 w-4 rounded border border-slate-200 bg-emerald-200" />
            <span className="inline-block h-4 w-4 rounded border border-slate-200 bg-emerald-300" />
            <span className="inline-block h-4 w-4 rounded border border-slate-200 bg-emerald-400" />
            <span>More</span>
          </div>
        )}

        <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full select-none border-collapse">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-white px-2 py-2 text-xs font-medium text-slate-500" />
                {dates.map((d) => (
                  <th
                    key={d}
                    className="px-1 py-2 text-center text-xs font-medium text-slate-600"
                  >
                    {formatDateHeader(d)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time, i) => (
                <tr key={time}>
                  <td className="sticky left-0 z-10 bg-white px-2 py-0 text-right text-[10px] text-slate-400 leading-none">
                    {i % 2 === 0 ? formatTime(time) : ""}
                  </td>
                  {dates.map((date) => {
                    const id = slotId(date, time);
                    return (
                      <td
                        key={id}
                        className={`cursor-pointer border border-slate-100 px-0 py-0 ${heatColor(id)} transition-colors`}
                        style={{ height: "16px", minWidth: "40px" }}
                        onPointerDown={() => handlePointerDown(id)}
                        onPointerEnter={() => handlePointerEnter(id)}
                      />
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!event.isLocked && (
          <fetcher.Form method="post" className="mt-6">
            <input type="hidden" name="name" value={name} />
            <input type="hidden" name="slots" value={Array.from(selected).join(",")} />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Availability"}
            </button>
          </fetcher.Form>
        )}
      </div>
    </main>
  );
}
