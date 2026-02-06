import type { ObjectId } from "mongodb";
import { getDb } from "~/lib/db.server";

export interface User {
  _id?: ObjectId;
  email: string;
  name?: string;
  createdAt: Date;
}

export async function createUser(user: Omit<User, "_id" | "createdAt">) {
  const db = await getDb();
  const doc = {
    ...user,
    createdAt: new Date(),
  };
  const result = await db.collection<User>("users").insertOne(doc as User);
  return result.insertedId;
}

export async function getUserById(id: ObjectId) {
  const db = await getDb();
  return db.collection<User>("users").findOne({ _id: id });
}
