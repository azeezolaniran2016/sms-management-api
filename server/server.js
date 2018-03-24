require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')

const contactRoute = require('./routes/Contact')
const messageRoute = require('./routes/Message')
const log = require('./util/logger')

log.info('Creating express server')
const server = express()
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
log.info('Conpleted creating express server')

log.info('Configuring router for express server')
const v1Router = express.Router()
contactRoute.configureRoutes(v1Router)
messageRoute.configureRoutes(v1Router)

server.use('/api/v1', v1Router)
log.info('Completed configuring router for express server')

const port = process.env.PORT || 3000

server.start = () => {
  log.info(`Starting server on port ${port}`)
  server.listen(port, (err) => {
    if(err) {
      return log.fatal('error occured when starting server.', err)
    }
    log.info(`Server started!`)
  })
}

module.exports = server
