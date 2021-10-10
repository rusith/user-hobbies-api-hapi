import { Hobby, IHobby } from "app/models/hobby"
import { ObjectId } from "bson"

export default async function (userId: ObjectId): Promise<IHobby[]> {
  const hobbies = await Hobby.find().where({ userId }).exec()

  return hobbies
}
