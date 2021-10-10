import Hapi from "@hapi/hapi"
import mongoose from "mongoose"
import config from "config"

const init = async () => {
  await mongoose.connect(config.get("db.url"))

  const server = Hapi.server({
    port: 3000,
    host: "localhost"
  })

  await server.start()
  console.log("Server running on %s", server.info.uri)
}

process.on("unhandledRejection", (err) => {
  console.log(err)
  process.exit(1)
})

init().catch(console.error)
