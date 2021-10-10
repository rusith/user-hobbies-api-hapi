/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MongoClient, Db } from "mongodb"

export async function createTestDb(): Promise<[MongoClient, Db]> {
  const connection = await MongoClient.connect((global as any).__MONGO_URI__, {
    //@ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const db = connection.db()

  return [connection, db]
}
