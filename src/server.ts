import * as dotenv from "dotenv"
import Fastify from "fastify"
import { createUserRoute } from "./infra/http/routes/create-user-route.js"
import { depositUserRoute } from "./infra/http/routes/deposit-user-route.js"

dotenv.config()

const app = Fastify({ logger: true })

app.register(createUserRoute)
app.register(depositUserRoute)

app.listen({ port: 3000 }).then(() => {
  console.log("Server listening on port 3000")
})
