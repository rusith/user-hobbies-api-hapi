import Hapi from "@hapi/hapi"
import { createUser, getAllUsers } from "app/modules/users"
import Joi from "joi"

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
      handler: (req) => createUser((req.payload as { name: string }).name),
      options: {
        validate: {
          payload: Joi.object({
            name: Joi.string().max(150).required()
          })
        }
      }
    }
  ])
}
