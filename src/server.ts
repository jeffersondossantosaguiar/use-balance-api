import * as dotenv from "dotenv"
import Fastify from "fastify"
import { createUserRoute } from "./infra/http/routes/create-user-route.js"

dotenv.config()

const app = Fastify({ logger: true })

app.register(createUserRoute)

app.listen({ port: 3000 }).then(() => {
  console.log("Server listening on port 3000")
})
