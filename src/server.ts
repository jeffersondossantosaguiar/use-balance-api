import Fastify from "fastify"
import { createUserRoute } from "./infra/http/routes/create-user-route.js"
import { depositUserRoute } from "./infra/http/routes/deposit-user-route.js"
import { withdrawUserRoute } from "./infra/http/routes/withdraw-from-user-route.js"

const app = Fastify({ logger: true })

app.register(createUserRoute)
app.register(depositUserRoute)
app.register(withdrawUserRoute)

app.listen({ port: 3000 }).then(() => {
  console.log("Server listening on port 3000")
})
