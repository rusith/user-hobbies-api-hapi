import NotFoundError from "app/errors/NotFoundError"
import { Hobby, IHobby } from "app/models/hobby"
import { ObjectId } from "bson"

export default async function (hobbyId: ObjectId, hobby: IHobby): Promise<IHobby> {
  const result = await Hobby.findById(hobbyId)

  if (!result) {
    throw new NotFoundError("hobby not found")
  }

  result.name = hobby.name
  result.year = hobby.year
  result.passionLevel = hobby.passionLevel

  await result.save()

  return result.toObject()
}
