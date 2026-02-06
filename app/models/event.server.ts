import type { ObjectId } from "mongodb";
import { getDb } from "~/lib/db.server";

export interface Event {
  _id?: ObjectId;
  name: string;
  dateRange: {
    start: Date;
    end: Date;
  };
  timeWindow: {
    start: string; // e.g., "09:00"
    end: string;   // e.g., "17:00"
  };
  timezone: string;
  createdBy?: ObjectId;
  createdAt: Date;
  isLocked: boolean;
}

export async function createEvent(event: Omit<Event, "_id" | "createdAt" | "isLocked">) {
  const db = await getDb();
  const doc = {
    ...event,
    createdAt: new Date(),
    isLocked: false,
  };
  const result = await db.collection<Event>("events").insertOne(doc as Event);
  return result.insertedId;
}

export async function getEventById(id: string) {
  const { ObjectId } = await import("mongodb");
  const db = await getDb();
  return db.collection<Event>("events").findOne({ _id: new ObjectId(id) });
}
