import amqp from 'amqplib';
import config from '../config';

export async function connect(): Promise<amqp.Channel> {
  const connection = await amqp.connect(config.amqpUrl);
  const channel = await connection.createChannel();
  await channel.assertQueue(config.amqpQueue, { durable: false });
  await channel.prefetch(1);
  return channel;
}
