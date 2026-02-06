import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017";
const DB_NAME = "when3meet";

declare global {
  var __mongoClient: MongoClient | undefined;
}

function getClient(): MongoClient {
  if (global.__mongoClient) {
    return global.__mongoClient;
  }
  global.__mongoClient = new MongoClient(MONGODB_URI);
  return global.__mongoClient;
}

export async function getDb() {
  const client = getClient();
  return client.db(DB_NAME);
}
