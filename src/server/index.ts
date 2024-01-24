import config from '../config/index';
import express from 'express';
import eventsRouter from '../modules/events/events.router';
import { connect } from '../amqp/connect';
import { createUserEvent } from '../modules/user-events/user-events.controller';
import { prismaClient } from '../orm';

export async function connectDB() {
  await prismaClient.$connect();
}

export async function serveHTTP() {
  const app = express();
  app.use(express.json());
  app.use(eventsRouter);

  app.listen(config.appPort, () => {
    console.log(`Running HTTP server on port: ${config.appPort}`);
  });
}

export async function subscribeAMQP() {
  const channel = await connect();
  console.log(`Connected AMQP on: ${config.amqpUrl}`);
  await channel.consume(config.amqpQueue, async (message) => {
    if (message !== null) {
      await createUserEvent(message);
      channel.ack(message);
    }
  });
}
