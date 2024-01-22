import config from './config/index'
import express from 'express'
import eventsRouter from './modules/events/events.router'

const app = express()

app.use(eventsRouter)

app.listen(config.appPort, () => {
  console.log(`Example app listening on port ${config.appPort}`)
})
