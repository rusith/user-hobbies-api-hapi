import NotFoundError from "app/errors/NotFoundError"
import { Hobby, IHobby } from "app/models/hobby"
import { ObjectId } from "bson"

export default async function (hobbyId: ObjectId): Promise<IHobby> {
  const existing = await Hobby.findById(hobbyId)
  if (!existing) {
    throw new NotFoundError("Hobby not found")
  }

  await existing.delete()

  return existing.toObject()
}
