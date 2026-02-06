import type { ObjectId } from "mongodb";
import { getDb } from "~/lib/db.server";

export interface Availability {
  _id?: ObjectId;
  eventId: ObjectId;
  participantId: ObjectId;
  /** Array of slot IDs or time strings in 15-min intervals */
  slots: string[];
  createdAt: Date;
  updatedAt: Date;
}

export async function upsertAvailability(availability: Omit<Availability, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDb();
  const now = new Date();
  await db.collection<Availability>("availabilities").updateOne(
    { eventId: availability.eventId, participantId: availability.participantId },
    {
      $set: {
        slots: availability.slots,
        updatedAt: now,
      },
    },
    { upsert: true }
  );
}

export async function getAvailabilitiesByEventId(eventId: ObjectId) {
  const db = await getDb();
  return db.collection<Availability>("availabilities")
    .find({ eventId })
    .toArray();
}
