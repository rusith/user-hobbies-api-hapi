/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"

let mongoServer: MongoMemoryServer = null

export const dbConnect = async (): Promise<void> => {
  mongoServer = await MongoMemoryServer.create({})
  const uri = mongoServer.getUri()
  await mongoose.connect(uri)
}

export const dbDisconnect = async (): Promise<void> => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongoServer.stop()
}
