const express = require("express")
const helmet = require("helmet")

const cohortsRouter = require("./cohorts/router.js")

const server = express()

server.use(helmet())
server.use(express.json())

server.use("/api/cohorts", cohortsRouter)

module.exports = server
