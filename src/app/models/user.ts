import { ObjectId } from "bson"
import { Schema, model } from "mongoose"

export interface IUser {
  id: ObjectId
  name: string
}

const schema = new Schema<IUser>({
  name: { type: String, required: true }
})

// schema.virtual("id").get(function () {
//   return this._id.toHexString()
// })

// clean the JSON output
schema.set("toJSON", {
  transform: (a, b) => {
    b.id = a._id.toString()
    delete b._id
    delete b.__v
  }
})

schema.set("toObject", {
  transform: (a, b) => {
    b.id = a._id
    delete b._id
    delete b.__v
  }
})

export const User = model<IUser>("User", schema)
