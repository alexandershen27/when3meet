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

export async function createParticipant(participant: Omit<Participant, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDb();
  const now = new Date();
  const doc = {
    ...participant,
    createdAt: now,
    updatedAt: now,
  };
  const result = await db.collection<Participant>("participants").insertOne(doc as Participant);
  return result.insertedId;
}
