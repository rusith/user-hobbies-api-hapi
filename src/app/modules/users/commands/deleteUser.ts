import NotFoundError from "app/errors/NotFoundError"
import { IUser, User } from "app/models/user"
import { ObjectId } from "bson"

export default async function (id: ObjectId): Promise<IUser> {
  const existing = await User.findById(id)

  if (!existing) {
    throw new NotFoundError("User not found")
  }

  await existing.delete()

  return existing
}
