/* eslint-disable @typescript-eslint/no-explicit-any */
import Hapi from "@hapi/hapi"
import mongoose from "mongoose"
import config from "config"
import userApi from "api/user.api"
import hobbyApi from "api/hobby.api"
import HapiSwagger from "hapi-swagger"
import Vision from "@hapi/vision"
import Inert from "@hapi/inert"

const init = async () => {
  await mongoose.connect(config.get("db.url"))

  const server = Hapi.server({
    port: 3000
  })

  userApi(server)
  hobbyApi(server)

  const swaggerOptions: HapiSwagger.RegisterOptions = {
    info: {
      title: "Hobbies API"
    }
  }

  const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
    {
      plugin: Inert
    },
    {
      plugin: Vision
    },
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]

  await server.register(plugins)
  await server.start()

  console.log("Server running on %s", server.info.uri)
}

process.on("unhandledRejection", (err) => {
  console.log(err)
  process.exit(1)
})

init().catch(console.error)
