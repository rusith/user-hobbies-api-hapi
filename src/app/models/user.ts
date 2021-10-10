import { ObjectId } from "bson"
import { Schema, model } from "mongoose"
import { cleanObject } from "./helpers"

export interface IUser {
  id: ObjectId
  name: string
}

const schema = new Schema<IUser>({
  name: { type: String, required: true }
})

cleanObject(schema)

export const User = model<IUser>("User", schema)
