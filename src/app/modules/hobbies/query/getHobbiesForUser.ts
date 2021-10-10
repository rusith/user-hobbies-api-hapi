/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hobby, IHobby } from "app/models/hobby"
import { ObjectId } from "bson"

export default async function (userId: ObjectId): Promise<IHobby[]> {
  const hobbies = await Hobby.find({
    user: { _id: userId } as any
  }).exec()

  return hobbies
}
