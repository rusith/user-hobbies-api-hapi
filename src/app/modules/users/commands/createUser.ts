import { IUser, User } from "app/models/user"

export default async function (name: string): Promise<IUser> {
  if (!name) {
    return null
  }

  return new User({
    name: name
  }).save()
}
