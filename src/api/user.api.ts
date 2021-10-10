import Hapi from "@hapi/hapi"
import { getAllUsers } from "app/users"

export default function (server: Hapi.Server): void {
  server.route({
    method: "GET",
    path: "/users",
    handler: async () => {
      console.log("HANDLER")
      return getAllUsers()
    }
  })
}
