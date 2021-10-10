import Hapi from "@hapi/hapi"
import { IHobby } from "app/models/hobby"
import { createHobby, deleteHobby, getHobbiesForUser, updateHobby } from "app/modules/hobbies"
import Joi from "joi"
import { createHandler } from "./helpers"

export default function (server: Hapi.Server): void {
  server.route([
    {
      method: "GET",
      path: "/users/{user}/hobbies",
      handler: (req) => getHobbiesForUser(req.params.user),
      options: {
        validate: {
          params: Joi.object({
            user: Joi.string().required().message("User ID is required")
          })
        }
      }
    },
    {
      method: "POST",
      path: "/users/{user}/hobbies",
      handler: createHandler<IHobby>((pl, req) => createHobby(req.params.user, pl)),
      options: {
        validate: {
          params: Joi.object({
            user: Joi.string().required().message("user is required")
          }),
          payload: Joi.object({
            name: Joi.string().required().message("name is required"),
            year: Joi.number().required().message("year is required"),
            passionLevel: [
              Joi.number().integer().max(5).min(1).message("passionLevel should be an integer between 1 and 5"),
              Joi.required().message("passionLevel is required")
            ]
          })
        }
      }
    },
    {
      method: "PUT",
      path: "/users/{user}/hobbies/{hobby}",
      handler: createHandler<IHobby>((pl, req) => updateHobby(req.params.hobby, pl)),
      options: {
        // validate: {
        //   params: Joi.object({
        //     user: Joi.string().required().message("user is required"),
        //     hobby: Joi.string().required().message("hobby is required")
        //   }),
        //   payload: Joi.object({
        //     name: Joi.string().required().message("name is required"),
        //     year: Joi.number().required().message("year is required"),
        //     passionLevel: [
        //       Joi.number().integer().max(5).min(1).message("passionLevel should be an integer between 1 and 5"),
        //       Joi.required().message("passionLevel is required")
        //     ]
        //   })
        // }
      }
    },
    {
      method: "DELETE",
      path: "/users/{user}/hobbies/{hobby}",
      handler: createHandler<IHobby>((pl, req) => deleteHobby(req.params.hobby)),
      options: {
        // validate: {
        //   params: Joi.object({
        //     user: Joi.string().required().message("user is required"),
        //     hobby: Joi.string().required().message("hobby is required")
        //   })
        // }
      }
    }
  ])
}
