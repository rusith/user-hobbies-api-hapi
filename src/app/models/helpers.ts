/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose"

export function cleanObject(schema: mongoose.Schema, extend?: (obj: any) => void): void {
  schema.set("toJSON", {
    transform: (a, b) => {
      b.id = a._id.toString()
      delete b._id
      delete b.__v

      if (extend) {
        extend(b)
      }
    }
  })

  schema.set("toObject", {
    transform: (a, b) => {
      b.id = a._id.toString()
      delete b._id
      delete b.__v

      if (extend) {
        extend(b)
      }
    }
  })
}
