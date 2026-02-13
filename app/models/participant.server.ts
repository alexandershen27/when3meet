import type { ObjectId } from "mongodb";
import { getDb } from "~/lib/db.server";

export interface Participant {
  _id?: ObjectId;
  eventId: ObjectId;
  name?: string;
  userId?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export async function findOrCreateParticipant(eventId: ObjectId, name: string) {
  const db = await getDb();
  const now = new Date();
  const result = await db.collection<Participant>("participants").findOneAndUpdate(
    { eventId, name },
    {
      $setOnInsert: { eventId, name, createdAt: now },
      $set: { updatedAt: now },
    },
    { upsert: true, returnDocument: "after" }
  );
  return result!;
}

export async function getParticipantsByEventId(eventId: ObjectId) {
  const db = await getDb();
  return db.collection<Participant>("participants").find({ eventId }).toArray();
}
