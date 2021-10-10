import { ObjectId } from "bson"
import { Schema, model, PopulatedDoc } from "mongoose"
import { cleanObject } from "./helpers"
import { IUser } from "./user"

export interface IHobby {
  id: ObjectId
  name: string
  passionLevel: number
  year: number
  user: PopulatedDoc<IUser>
}

const schema = new Schema<IHobby>({
  name: { type: String, required: true },
  passionLevel: { type: Number, required: true },
  year: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" }
})

// clean the JSON output
cleanObject(schema, (o) => {
  delete o.user
})

export const Hobby = model<IHobby>("Hobby", schema)
