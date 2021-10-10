import { Schema, model, ObjectId } from "mongoose"

export interface IUser {
  id: ObjectId
  name: string
}

const schema = new Schema<IUser>({
  name: { type: String, required: true }
})

export const User = model<IUser>("User", schema)
