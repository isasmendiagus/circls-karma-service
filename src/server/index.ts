import config from '../config/index';
import express from 'express';
import eventsRouter from '../modules/events/events.router';

export function serveHTTP() {
  const app = express();

  app.use(express.json());
  app.use(eventsRouter);

  app.listen(config.appPort, () => {
    console.log(`Running app on port: ${config.appPort}`);
  });
}
