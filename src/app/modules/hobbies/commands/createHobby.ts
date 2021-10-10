import NotFoundError from "app/errors/NotFoundError"
import { Hobby, IHobby } from "app/models/hobby"
import { User } from "app/models/user"
import { ObjectId } from "bson"

export default async function (userId: ObjectId, hobby: IHobby): Promise<IHobby> {
  const existing = await User.findById(userId)
  if (!existing) {
    throw new NotFoundError("User not found")
  }

  const result = (
    await Hobby.create({
      name: hobby.name,
      passionLevel: hobby.passionLevel,
      year: hobby.year,
      user: { _id: userId }
    })
  ).toObject()

  return result
}
