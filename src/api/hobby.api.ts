import Hapi from "@hapi/hapi"
import { IUser } from "app/models/user"
import { getHobbiesForUser } from "app/modules/hobbies"
import { createUser, deleteUser, getAllUsers, updateUser } from "app/modules/users"
import Joi from "joi"
import { createHandler } from "./helpers"

export default function (server: Hapi.Server): void {
  server.route([
    {
      method: "GET",
      path: "/users/{user}/hobbies",
      handler: (req) => getHobbiesForUser(req.params.user)
    }
  ])
}
