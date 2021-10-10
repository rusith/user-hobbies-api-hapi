import Hapi from "@hapi/hapi"
import { IUser } from "app/models/user"
import { createUser, getAllUsers, updateUser } from "app/modules/users"
import Joi from "joi"
import { createHandler } from "./helpers"

export default function (server: Hapi.Server): void {
  server.route([
    {
      method: "GET",
      path: "/users",
      handler: getAllUsers
    },
    {
      method: "POST",
      path: "/users",
      handler: createHandler<IUser>((pl) => createUser(pl.name)),
      options: {
        validate: {
          payload: Joi.object({
            name: Joi.string().max(150).required()
          })
        }
      }
    },
    {
      method: "PUT",
      path: "/users/{user}",
      handler: createHandler<IUser>((pl, req) => updateUser(req.params.user, pl)),
      options: {
        validate: {
          params: Joi.object({
            user: Joi.string().required()
          }),
          payload: Joi.object({
            name: Joi.string().max(150).required()
          })
        }
      }
    }
  ])
}
