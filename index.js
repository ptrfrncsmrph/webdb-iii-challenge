const server = require("./api/server")

const port = 9000 || process.env.PORT

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
