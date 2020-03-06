const express = require('express')
const consola = require('consola')
const routes = require('./routes')
const cors = require('cors')
const app = express()

// Import and Set Nuxt.js options
const config = require('../server.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {

  const { host, port } = config

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(cors())

  routes.initlializeRoutes(app);

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })

}
start()
