import { IUser, User } from "app/models/user"

export default async function (name: string): Promise<IUser> {
  if (!name) {
    throw new Error("Name is required")
  }

  return (
    await new User({
      name: name
    }).save()
  ).toObject()
}
