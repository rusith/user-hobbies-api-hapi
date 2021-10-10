import NotFoundError from "app/errors/NotFoundError"
import { Hobby } from "app/models/hobby"
import { IUser, User } from "app/models/user"
import { ObjectId } from "bson"

export default async function (id: ObjectId): Promise<IUser> {
  const existing = await User.findById(id)

  if (!existing) {
    throw new NotFoundError("User not found")
  }

  await existing.delete()

  await Hobby.deleteMany().where({
    userId: id
  })

  return existing.toObject()
}
