import mongoose from "mongoose"

export function cleanObject(schema: mongoose.Schema): void {
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
}
