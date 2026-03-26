const { createServer } = require("http")
const { parse } = require("url")
const next = require("next")
const { Server } = require("socket.io")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  })

  const io = new Server(httpServer)

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`)

    // seeker or employer joins a conversation room
    socket.on("join_conversation", (conversationId) => {
      socket.join(conversationId)
      console.log(`${socket.id} joined conversation: ${conversationId}`)
    })

    // someone sends a message
    socket.on("send_message", ({ conversationId, message }) => {
      socket.to(conversationId).emit("receive_message", message)
    })

    socket.on("disconnect", () => {
      console.log("Client disconnected")
    })
  })

  httpServer.listen(3000, () => {
    console.log("> Ready on http://localhost:3000")
  })
})