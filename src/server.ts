import Fastify from "fastify"

const app = Fastify({ logger: true })

app.get("/", async () => {
  return { message: "Server is running" }
})

app.listen({ port: 3000 }).then(() => {
  console.log("Server listening on port 3000")
})
