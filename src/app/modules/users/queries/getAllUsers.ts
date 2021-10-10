import { IUser, User } from "app/models/user"

export default async function (): Promise<IUser[]> {
  return await User.find().sort({ name: 1 })
}
