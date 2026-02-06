import { MongoClient, Db } from "mongodb";
import { env } from "../config/env.js";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectDb() {
  if (db) return db;
  client = new MongoClient(env.MONGO_URI);
  await client.connect();
  db = client.db();
  return db;
}

export async function disconnectDb() {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}
