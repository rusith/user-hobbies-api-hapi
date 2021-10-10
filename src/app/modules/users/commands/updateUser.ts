import NotFoundError from "app/errors/NotFoundError"
import { IUser, User } from "app/models/user"
import { ObjectId } from "bson"

export default async function (id: ObjectId, user: IUser): Promise<IUser> {
  const existing = await User.findById(id)
  if (!existing) {
    throw new NotFoundError("User not found")
  }

  existing.name = user.name

  await existing.save()
  return existing
}
