import Hapi from "@hapi/hapi"
import { IUser } from "app/models/user"
import { createUser, deleteUser, getAllUsers, updateUser } from "app/modules/users"
import Joi from "joi"
import { createHandler, handleValidatinError } from "./helpers"

const userSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string()
}).label("User")

export default function (server: Hapi.Server): void {
  server.route([
    {
      method: "GET",
      options: {
        description: "Get all users",
        response: {
          schema: Joi.array().items(userSchema).description("ListOfUsers")
        },
        tags: ["api"]
      },
      path: "/users",
      handler: createHandler(() => getAllUsers())
    },
    {
      method: "POST",
      path: "/users",
      handler: createHandler<IUser>((pl) => createUser(pl.name)),
      options: {
        description: "Create a new user",
        response: {
          schema: userSchema.description("Created user")
        },
        validate: {
          payload: Joi.object({
            name: Joi.string().max(150).required()
          }),
          failAction: handleValidatinError
        },
        tags: ["api"]
      }
    },
    {
      method: "PUT",
      path: "/users/{user}",
      handler: createHandler<IUser>((pl, req) => updateUser(req.params.user, pl)),
      options: {
        description: "Updates the given user",
        response: {
          schema: userSchema
        },
        validate: {
          params: Joi.object({
            user: Joi.string().required()
          }),
          payload: Joi.object({
            name: Joi.string().max(150).required()
          }),
          failAction: handleValidatinError
        },
        tags: ["api"]
      }
    },
    {
      method: "DELETE",
      path: "/users/{user}",
      handler: createHandler<IUser>((_, req) => deleteUser(req.params.user)),
      options: {
        description: "Deletes the given user",
        response: {
          schema: userSchema
        },
        validate: {
          params: Joi.object({
            user: Joi.string().required()
          }),
          failAction: handleValidatinError
        },
        tags: ["api"]
      }
    }
  ])
}
