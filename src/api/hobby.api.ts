import Hapi from "@hapi/hapi"
import { IHobby } from "app/models/hobby"
import { createHobby, deleteHobby, getHobbiesForUser, updateHobby } from "app/modules/hobbies"
import Joi from "joi"
import { createHandler, handleValidatinError } from "./helpers"

const hobbySchema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  passionLevel: Joi.number().integer(),
  year: Joi.number().integer()
}).label("Hobby")

export default function (server: Hapi.Server): void {
  server.route([
    {
      method: "GET",
      path: "/users/{user}/hobbies",
      handler: createHandler((_, req) => getHobbiesForUser(req.params.user)),
      options: {
        description: "Get hobbies for the given user",
        validate: {
          params: Joi.object({
            user: Joi.string().required().description("Target user ID")
          }),
          failAction: handleValidatinError
        },
        tags: ["api", "hobbies"],
        response: {
          schema: Joi.array().items(hobbySchema).description("ListOfHobbies")
        }
      }
    },
    {
      method: "POST",
      path: "/users/{user}/hobbies",
      handler: createHandler<IHobby>((pl, req) => createHobby(req.params.user, pl)),
      options: {
        description: "Create a new hobby for the given user",
        validate: {
          params: Joi.object({
            user: Joi.string().required()
          }),
          payload: Joi.object({
            name: Joi.string().required(),
            year: Joi.number().required(),
            passionLevel: [Joi.number().integer().max(5).min(1), Joi.number().integer().required()]
          }),
          failAction: handleValidatinError
        },
        tags: ["api"],
        response: {
          schema: hobbySchema
        }
      }
    },
    {
      method: "PUT",
      path: "/users/{user}/hobbies/{hobby}",
      handler: createHandler<IHobby>((pl, req) => updateHobby(req.params.hobby, pl)),
      options: {
        description: "Updates the given hobby",
        validate: {
          params: Joi.object({
            user: Joi.string().required(),
            hobby: Joi.string().required()
          }),
          payload: Joi.object({
            name: Joi.string().required(),
            year: Joi.number().required(),
            passionLevel: [Joi.number().integer().max(5).min(1), Joi.required()]
          }),
          failAction: handleValidatinError
        },
        tags: ["api"],
        response: {
          schema: hobbySchema
        }
      }
    },
    {
      method: "DELETE",
      path: "/users/{user}/hobbies/{hobby}",
      handler: createHandler<IHobby>((_, req) => deleteHobby(req.params.hobby)),
      options: {
        description: "Deletes the given hobby",
        validate: {
          params: Joi.object({
            user: Joi.string().required(),
            hobby: Joi.string().required()
          }),
          failAction: handleValidatinError
        },
        tags: ["api"],
        response: {
          schema: hobbySchema
        }
      }
    }
  ])
}
