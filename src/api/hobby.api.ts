import Hapi from "@hapi/hapi"
import { IHobby } from "app/models/hobby"
import { createHobby, deleteHobby, getHobbiesForUser, updateHobby } from "app/modules/hobbies"
import Joi from "joi"
import { createHandler, handleValidatinError } from "./helpers"

export default function (server: Hapi.Server): void {
  server.route([
    {
      method: "GET",
      path: "/users/{user}/hobbies",
      handler: (req) => getHobbiesForUser(req.params.user),
      options: {
        validate: {
          params: Joi.object({
            user: Joi.string().required()
          }),
          failAction: handleValidatinError
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
            user: Joi.string().required()
          }),
          payload: Joi.object({
            name: Joi.string().required(),
            year: Joi.number().required(),
            passionLevel: [Joi.number().integer().max(5).min(1), Joi.number().integer().required()]
          }),
          failAction: handleValidatinError
        }
      }
    },
    {
      method: "PUT",
      path: "/users/{user}/hobbies/{hobby}",
      handler: createHandler<IHobby>((pl, req) => updateHobby(req.params.hobby, pl)),
      options: {
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
        }
      }
    },
    {
      method: "DELETE",
      path: "/users/{user}/hobbies/{hobby}",
      handler: createHandler<IHobby>((pl, req) => deleteHobby(req.params.hobby)),
      options: {
        validate: {
          params: Joi.object({
            user: Joi.string().required(),
            hobby: Joi.string().required()
          }),
          failAction: handleValidatinError
        }
      }
    }
  ])
}
